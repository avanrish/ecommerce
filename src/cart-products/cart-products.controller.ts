import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart Products')
@Controller('cart-products')
export class CartProductsController {
  // constructor(private readonly cartProductsService: CartProductsService) {}
}
