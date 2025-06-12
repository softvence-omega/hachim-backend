import { IsInt, Min } from 'class-validator';

export class CalculateScoreDto {
  @IsInt()
  @Min(0)
  totalPoints: number;

  @IsInt()
  @Min(1)
  numberOfQuestions: number;
}
