import { IsUUID, IsNumber, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  

  @IsNumber()
  amount: number;


   @IsNumber() 
   durationDays:number 

  
}
