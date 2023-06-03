import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products/products.service';

@ApiTags('Pages')
@Controller()
export class AppController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('')
  @Render('index')
  async root() {
    const products = await this.productsService.findAll();
    return { title: 'E-Commerce', products };
  }

  @Get('cart')
  @Render('cart')
  async cart() {
    // const products = await this.productsService.findAll();
    return { title: 'Cart | E-Commerce', products: [] };
  }
}
