import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateScoreDto {
  @ApiProperty({
    example: 85,
    description: 'Total points scored by the user (must be 0 or higher)',
    minimum: 0,
  })
  @IsInt({ message: 'Total points must be an integer' })
  @Min(0, { message: 'Total points cannot be negative' })
  totalPoints: number;

  @ApiProperty({
    example: 100,
    description: 'Total number of questions answered (must be at least 1)',
    minimum: 1,
  })
  @IsInt({ message: 'Number of questions must be an integer' })
  @Min(1, { message: 'Number of questions must be at least 1' })
  numberOfQuestions: number;
}
