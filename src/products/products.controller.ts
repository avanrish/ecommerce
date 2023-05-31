import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() productDto: CreateProductDto) {
    const unsavedProduct = this.productsService.create(productDto);
    return this.productsService.save(unsavedProduct);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
