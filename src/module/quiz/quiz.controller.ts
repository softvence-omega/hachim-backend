import { Controller, Post, Body, Req } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Public } from 'src/common/decorators/public.decorators';
import { Request } from 'express';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  
  @Public()
  @Post('analyze')
  analyze(@Body() body: { answers: { title: string; answer: string }[],userinfo:{name:string,age:number} }, @Req() req) {
  
    return this.quizService.calculateScore(body.answers,body.userinfo,req.user.sub);
  }
}
