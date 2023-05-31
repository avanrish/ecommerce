import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CreateProductDto } from './dto/create-product.dto';
// import { Product } from './entities/product.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  // constructor(
  //   @InjectRepository(Product)
  //   private readonly productsRepository: Repository<Product>,
  // ) {}

  // create(createProductDto: CreateProductDto) {
  //   const product = this.productsRepository.create(createProductDto);
  //   return this.productsRepository.save(product);
  // }

  // findAll() {
  //   return `This action returns all products`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }
  //
  // update(id: number, updateProductDto: UpdateProductDto) {
  //   console.log(updateProductDto);
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
