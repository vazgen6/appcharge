import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offer } from '../schemas/offer.schema';
import { Model } from 'mongoose';
import { OfferDto } from './offer.dto';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class OfferService {
  constructor(@InjectModel(Offer.name) private offerModel: Model<Offer>) {}

  public async findAll() {
    return this.offerModel.find();
  }

  public async findOne(id: string) {
    return this.offerModel.findById(id);
  }

  public async findOneBySetId(offerSetId: string) {
    return this.offerModel.findOne({ offerSetId });
  }

  public async create(offer: OfferDto, user: UserDocument) {
    return this.offerModel.create({ ...offer, userId: user._id });
  }

  public async update(_id: string, offer: OfferDto, user: UserDocument) {
    const foundOffer = await this.findOne(_id);
    if (!foundOffer) {
      throw new NotFoundException('offer not found');
    }
    if (foundOffer.userId.toString() !== user._id) {
      throw new ForbiddenException();
    }
    await this.offerModel.updateOne({ _id }, offer);
    return await this.findOne(_id);
  }

  public async delete(_id: string, user: UserDocument) {
    const foundOffer = await this.findOne(_id);
    if (!foundOffer) {
      throw new NotFoundException('offer not found');
    }
    if (foundOffer.userId.toString() !== user._id) {
      throw new ForbiddenException();
    }
    return this.offerModel.deleteOne({ _id });
  }
}
