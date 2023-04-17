import { IsNotEmpty, IsCreditCard, IsString } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  offerSetId: string;

  @IsNotEmpty()
  @IsCreditCard()
  ccNumber: string;

  @IsNotEmpty()
  @IsString()
  ccMonthYear: string; // 04-23
}
