import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OfferService } from './offer.service';
import { OfferDto } from './offer.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@ApiTags('Offer')
@UseGuards(AuthenticatedGuard)
@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}
  @Get()
  public async getAll() {
    return await this.offerService.findAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    return await this.offerService.findOne(id);
  }

  @Post()
  public async createOne(@Body() offer: OfferDto, @Request() req) {
    return await this.offerService.create(offer, req.user);
  }

  @Put(':id')
  public async updateOne(
    @Param('id') id: string,
    @Body() offer: OfferDto,
    @Request() req,
  ) {
    console.log(req.user);
    return await this.offerService.update(id, offer, req.user);
  }

  @Delete(':id')
  public async deleteOne(@Param('id') id: string, @Request() req) {
    return await this.offerService.delete(id, req.user);
  }
}
