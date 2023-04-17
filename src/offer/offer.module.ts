import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { Offer, OfferSchema } from 'src/schemas/offer.schema';

@Module({
  providers: [OfferService],
  controllers: [OfferController],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Offer.name, schema: OfferSchema },
    ]),
  ],
  exports: [OfferService],
})
export class OfferModule {}
