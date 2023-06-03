import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { CartProductsService } from '../cart-products/cart-products.service';
import { ProductsService } from '../products/products.service';
import { CartsError } from './enums/carts-error.enum';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartProductsService: CartProductsService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('add-product')
  async addProduct(@Body() addProductToCartDto: AddProductToCartDto) {
    const { cartId, productId, quantity } = addProductToCartDto;
    const cart = cartId
      ? await this.cartService.findOne(cartId)
      : this.cartService.create();

    if (cart.isOrdered) throw new BadRequestException(CartsError.CartIsOrdered);

    const product = await this.productsService.findOne(productId);
    if (!product) throw new NotFoundException(CartsError.ProductNotFound);

    const productIndexInCart = cart.cartProducts?.findIndex(
      (cartProduct) => cartProduct?.product?.id === productId,
    );

    if (productIndexInCart > -1) {
      cart.cartProducts[productIndexInCart].quantity += quantity;
      return cart.save();
    }

    const cartProduct = this.cartProductsService.create({
      product,
      quantity,
    });

    if (cart?.cartProducts?.length > 0)
      cart.cartProducts = [...cart.cartProducts, cartProduct];
    else cart.cartProducts = [cartProduct];
    return cart.save();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    let data;
    try {
      data = await this.cartService.findOne(id);
    } catch {
      throw new BadRequestException(CartsError.CartIdShouldBeUUID);
    }
    if (!data) throw new NotFoundException(CartsError.CartNotFound);
    return data;
  }
  @Get(':id/prices')
  async getProductPrices(@Param('id') id: string) {
    let data;
    try {
      data = await this.cartService.findOne(id);
    } catch {
      throw new BadRequestException(CartsError.CartIdShouldBeUUID);
    }
    if (!data) throw new NotFoundException(CartsError.CartNotFound);
    return this.cartService.getCartPrices(data);
  }
}
