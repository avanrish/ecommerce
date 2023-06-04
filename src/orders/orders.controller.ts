import { Body, Controller, NotFoundException, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';
import { OrdersError } from './enums/orders-error.enum';
import { OrderProduct } from '../order-products/entities/order-product.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly cartsService: CartService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    if (res) {
    }
    const order = new Order();
    const cart = await this.cartsService.findOne(createOrderDto.cartId);
    const { priceToPay } = this.cartsService.getCartPrices(cart);
    if (!cart) throw new NotFoundException([OrdersError.CartNotFound]);
    order.orderProducts = [];
    cart.cartProducts?.forEach((cartProduct) => {
      const newOrderProduct = new OrderProduct();
      newOrderProduct.product = cartProduct.product;
      newOrderProduct.quantity = cartProduct.quantity;
      newOrderProduct.order = order;
      order.orderProducts.push(newOrderProduct);
    });
    await order.save();

    const data = await this.ordersService.makeRequestToPayU(priceToPay, order);

    return res.status(200).json(data);
  }
}
