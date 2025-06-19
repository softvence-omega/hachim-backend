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
import { JournalModule } from './module/journal/journal.module';
import { MotivationTrackModule } from './module/motivationTrack/motivation-track.module';
import { SleepTrackModule } from './module/sleep-track/sleep-track.module';
import { MoodTrackModule } from './module/mood-track/mood-track.module';
import { RelapseModule } from './module/relapse/relapse.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SeederService } from './seeder/seeder.service';
import { ArticleModule } from './module/article/article.module';
import { QuoteModule } from './module/quote/quote.module';
import { sub } from 'date-fns';
import { SubscriptionModule } from './module/subscription/subscription.module';
import { RecoveryModule } from './module/recovery/recovery.modulet';
import { VideoModule } from './module/video/video.module';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: process.env.EMAIL_USER,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    QuizModule,
    CommentModule,
    UserModule,

    PaymentModule,
    MotivationTrackModule,
    SleepTrackModule,
    MoodTrackModule,
    RelapseModule,
    JournalModule,
    ArticleModule,
    QuoteModule,
    RecoveryModule,
    SubscriptionModule,
    RecoveryModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
