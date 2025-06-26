import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { isSubscriptionActive } from 'src/utils/isSubscriptionActive';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canProceed = await super.canActivate(context);
    if (!canProceed) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isBlocked = await this.prisma.user.findUnique({
      where:{
        email: user.email,
        isBlocked:true
      }
    })
    
    if (isBlocked) {
      throw new ForbiddenException('Your account is blocked');
    }

   if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') return true;


    // 🔍 Get all payments, latest first
    const payments = await this.prisma.payment.findMany({
      where: { email: user.email },
      orderBy: { createdAt: 'desc' },
    });

    const activePayment = payments.find(payment =>
      isSubscriptionActive(payment.createdAt, payment.durationDays ?? 0),
    );

    if (!activePayment) {
      // 🔄 Optionally mark all as inactive
      await this.prisma.payment.updateMany({
        where: { email: user.email, subscription: true },
        data: { subscription: false },
      });

      throw new ForbiddenException('Subscription expired. Please renew your plan.');
    }

    return true;
  }
}
