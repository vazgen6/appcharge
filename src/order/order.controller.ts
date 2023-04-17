import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@ApiTags('Order')
@UseGuards(AuthenticatedGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async order(@Body() order: OrderDto, @Request() req) {
    return await this.orderService.create(order, req.user);
  }
}
