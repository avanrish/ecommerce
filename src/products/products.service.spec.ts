import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductsRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((product) => ({
      id: Math.floor(Math.random() * 1000),
      ...product,
    })),
    find: jest.fn(() => [Product.example]),
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

  it('should call create method of productsRepository', async () => {
    const product = {
      title: 'Product 1',
      author: 'Author 1',
      price: 9.99,
    };
    await service.create(product);

    expect(mockProductsRepository.create).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.create).toHaveBeenCalledWith(product);
  });

  it('should create a product entity', async () => {
    const product = await service.create({
      title: 'Product 1',
      author: 'Author 1',
      price: 9.99,
    });

    expect(product).toEqual({
      title: 'Product 1',
      author: 'Author 1',
      price: 9.99,
    });
  });

  it('should call findAll method of productsRepository', async () => {
    await service.findAll();

    expect(mockProductsRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should return an array of products', async () => {
    const products = await service.findAll();

    expect(products).toEqual([Product.example]);
  });

  it('should save a product entity', async () => {
    const product = await service.create({
      title: 'Product 1',
      author: 'Author 1',
      price: 9.99,
    });

    const savedProduct = await service.save(product);

    expect(savedProduct).toEqual({ id: expect.any(Number), ...product });
  });
});
