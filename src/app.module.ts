import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { QuizModule } from './module/quiz/quiz.module';
import { CommentModule } from './module/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,AuthModule, QuizModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
