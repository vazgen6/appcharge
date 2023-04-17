import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { OrderDto } from './order.dto';
import { encrypt } from 'src/helpers/hash';
import { OfferService } from 'src/offer/offer.service';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly offerService: OfferService,
  ) {}

  public async create(order: OrderDto, user: UserDocument) {
    const foundOffer = await this.offerService.findOneBySetId(order.offerSetId);
    if (!foundOffer) {
      throw new BadRequestException('Offer not found');
    }
    if (foundOffer.availability < 1) {
      throw new BadRequestException('product unavailable');
    }

    const [month, year] = order.ccMonthYear.split('-').map((v) => +v);
    if (month > 12 || month < 1) {
      throw new BadRequestException('invalid month field');
    }

    const currentYear = +new Date().getFullYear().toString().slice(1);
    const currentMonth = +new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      throw new BadRequestException('expired card');
    }

    await this.offerService.update(
      foundOffer.id,
      {
        ...foundOffer.toObject(),
        availability: foundOffer.availability - 1,
      },
      user,
    );

    const newOrder = await this.orderModel.create({
      ...order,
      userId: user._id,
    });

    return encrypt(newOrder.id);
  }
}
