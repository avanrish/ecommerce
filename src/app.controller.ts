import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products/products.service';

@ApiTags('pages')
@Controller()
export class AppController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('')
  @Render('index')
  async root() {
    const products = await this.productsService.findAll();
    console.log(products);
    return { title: 'E-Commerce', products };
  }
}
