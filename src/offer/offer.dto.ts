import { IsArray, IsNotEmpty, IsPositive, MaxLength } from 'class-validator';
import { Product } from 'src/schemas/product.schema';

export class OfferDto {
  @IsNotEmpty()
  @MaxLength(255)
  gameId: string;

  @IsNotEmpty()
  @IsPositive()
  availability: number;

  @IsNotEmpty()
  @MaxLength(255)
  offerSetName: string;

  @IsNotEmpty()
  @MaxLength(255)
  offerSetId: string;

  @IsNotEmpty()
  @MaxLength(255)
  sku: string;

  @IsNotEmpty()
  @MaxLength(255)
  priceInCents: string;

  @IsNotEmpty()
  @MaxLength(255)
  currency: string;

  @IsNotEmpty()
  @IsArray()
  products: Product[];
}
