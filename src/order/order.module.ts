import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OfferModule } from 'src/offer/offer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    OfferModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
})
export class OrderModule {}
