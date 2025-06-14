import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, UserStatus } from '@prisma/client';
import { UserInfo } from 'os';
const prisma = new PrismaClient();
@Injectable()
export class QuizService {
  private readonly averageScore = 13;

  private readonly scoreMap: Record<string, Record<string, number>> = {
    'At what age did you start watching porn regularly?': {
      'Before 13': 3,
      '13–17': 2,
      '18 or older': 1,
      'Never': 0,
    },
    'How often do you watch porn?': {
      'Daily': 3,
      'Weekly': 2,
      'Monthly': 1,
      'Rarely': 0,
    },
    'Has your porn usage increased over time?': {
      'Yes': 3,
      'Somewhat': 2,
      'No': 0,
    },
    'Do you seek more extreme or specific content?': {
      'Yes': 3,
      'Sometimes': 2,
      'No': 0,
    },
    'Has porn affected your relationships or productivity?': {
      'Yes': 3,
      'A little': 2,
      'No': 0,
    },
    "What’s your gender?": {
      'Male': 0,
      'Female': 0,
      'Other': 0,
    },
    'Do you watch porn when feeling sad/lonely?': {
      'Often': 3,
      'Sometimes': 2,
      'Rarely': 1,
      'Never': 0,
    },
    'Do you use porn to manage stress or emotions?': {
      'Yes': 3,
      'Sometimes': 2,
      'No': 0,
    },
    'Do you find it hard to stop watching porn?': {
      'Yes': 3,
      'Sometimes': 2,
      'No': 0,
    },
    'Have you tried to quit but failed?': {
      'Yes': 3,
      'No': 0,
    },
    'Do you feel guilt or shame after watching porn?': {
      'Always': 3,
      'Sometimes': 2,
      'Never': 0,
    },
    'Have you watched porn at work/school?': {
      'Yes': 3,
      'Sometimes': 2,
      'No': 0,
    },
    'Do you hide your porn usage from others?': {
      'Yes': 3,
      'Sometimes': 2,
      'No': 0,
    },
    'Do you spend money on porn?': {
      'Yes': 3,
      'Sometimes': 2,
      'No': 0,
    },
    'Would you say you’re addicted to porn?': {
      'Yes': 3,
      'Not sure': 2,
      'No': 0,
    },
  };

  async calculateScore(answers: { title: string; answer: string }[],userinfo:{name:string,age:number},userId:string) {

 
    await prisma.user.update({
    where: { id: userId },
    data: {
      ...userinfo,
    },
  });

    let totalPoints = 0;
    let maxPoints = 0;

    for (const item of answers) {
      const questionMap = this.scoreMap[item.title];
      if (questionMap) {
        const point = questionMap[item.answer] ?? 0;
        totalPoints += point;
        maxPoints += 3;
      }
    }

    const percentage = maxPoints ? Math.round((totalPoints / maxPoints) * 100) : 0;
    const completionPercentage = parseFloat(((answers.length / Object.keys(this.scoreMap).length) * 100).toFixed(2));
    const diffFromAvg = percentage - this.averageScore;

    return {
      AnalysisComplete:completionPercentage,
      yourScore: `${percentage}%`,
      averageScore: `${this.averageScore}%`,
      higherDependence: `${diffFromAvg}% higher dependence than average`,
    };
  }

  async goalsUpdate(userId:string,goals:string) {
    const result = await prisma.user.update({
    where: { id: userId },
    data: {
      goals,
      status: UserStatus.COMPLETED
    },
  });
  return result;
  }

  async create(dto:{mental: string;physical: string;social: string;faith: string;},userId:string) {
    
    const existing = await prisma.symptoms.findUnique({
      where: { userId:userId },
    });
    
    if (existing) {
      throw new BadRequestException('Symptoms already exist for this user');
    }
    console.log('uuu')
    return await prisma.symptoms.create({
      data: {
        ...dto,
        userId
      }
    });
  }
}
