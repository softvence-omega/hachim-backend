import { Body, Controller, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CalculateScoreDto } from './dto/ quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculateScoreDto) {
    return this.quizService.calculateScore(dto.totalPoints, dto.numberOfQuestions);
  }
}
