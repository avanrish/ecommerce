import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductsService = {
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) => ({
      id: Math.floor(Math.random() * 1000),
      ...dto,
    })),
    findAll: jest.fn(() => [Product.example]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method of productsService', async () => {
    const product = {
      title: 'Product 1',
      author: 'Author 1',
      price: 9.99,
    };
    await controller.create(product);

    expect(mockProductsService.create).toHaveBeenCalledTimes(1);
    expect(mockProductsService.create).toHaveBeenCalledWith(product);
  });

  it('should return a product entity', async () => {
    const product = await controller.create({
      title: 'Product 1',
      author: 'Author 1',
      price: 9.99,
    });

    expect(product).toEqual({
      id: expect.any(Number),
      title: 'Product 1',
      author: 'Author 1',
      price: 9.99,
    });
  });

  it('should find all products', async () => {
    const products = await controller.findAll();

    expect(products).toEqual([Product.example]);
    expect(products).toBeInstanceOf(Array);
  });
});
