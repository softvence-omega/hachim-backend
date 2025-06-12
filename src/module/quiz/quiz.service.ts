import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  private readonly maxPointsPerQuestion = 3;
  private readonly averageScore = 13; // in %

  calculateScore(totalPoints: number, numberOfQuestions: number) {
    const maxPossiblePoints = numberOfQuestions * this.maxPointsPerQuestion;
    const userScore = (totalPoints / maxPossiblePoints) * 100;
    const roundedUserScore = Math.round(userScore);
    const difference = Math.max(0, roundedUserScore - this.averageScore);

    return {
      userScore: roundedUserScore,
      averageScore: this.averageScore,
      higherDependence: difference,
      message: `You have ${difference}% higher dependence than average.`,
    };
  }
}
