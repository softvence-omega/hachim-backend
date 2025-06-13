import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { QuizModule } from './module/quiz/quiz.module';
import { CommentModule } from './module/comment/comment.module';
import { PaymentModule } from './module/payment/payment.module';
import { MotivationTrackModule } from './module/motivationTrack/motivation-track.module';
import { SleepTrackModule } from './module/sleep-track/sleep-track.module';
import { MoodTrackModule } from './module/mood-track/mood-track.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,AuthModule, QuizModule, CommentModule,UserModule,
    PaymentModule,MotivationTrackModule,SleepTrackModule,MoodTrackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


