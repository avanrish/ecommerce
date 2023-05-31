import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductsRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((product) => ({
      id: Math.floor(Math.random() * 1000),
      ...product,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create product', () => {
    const productDto: CreateProductDto = {
      author: 'John Doe',
      title: 'Test title',
      price: 15,
    };
    const product = service.create(productDto);
    expect(product).toEqual({
      id: expect.any(Number),
      ...productDto,
    });
  });
});
