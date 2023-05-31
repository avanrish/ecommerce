import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(product: CreateProductDto) {
    return this.productsRepository.create(product);
  }

  save(product: Product) {
    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }
}
