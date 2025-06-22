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


    if (user.role === 'ADMIN') return true;

    const payment = await this.prisma.payment.findUnique({
      where: { email: user.email },
    });
 console.log(user,payment)
    if (!payment || !isSubscriptionActive(payment.createdAt, payment.durationDays ?? 0)) {
      throw new ForbiddenException('Subscription expired. Please renew your plan.');
    }

    return true;
  }
}
