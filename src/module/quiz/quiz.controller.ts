import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Public } from 'src/common/decorators/public.decorators';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  
  @Public()
  @Post('analyze')
  analyze(@Body() body: { answers: { title: string; answer: string }[] }) {
    return this.quizService.calculateScore(body.answers);
  }
}
