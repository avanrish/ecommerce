import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CartsError } from '../enums/carts-error.enum';

export class AddProductToCartDto {
  @IsOptional()
  @IsString({ message: CartsError.CartIdShouldBeString })
  @IsUUID(4, { message: CartsError.CartIdShouldBeUUID })
  cartId?: string;

  @IsNotEmpty({ message: CartsError.ProductIdEmpty })
  @IsInt({ message: CartsError.ProductIdShouldBeInt })
  productId: number;

  @IsNotEmpty({ message: CartsError.QuantityEmpty })
  @IsInt({ message: CartsError.QuantityShouldBeInt })
  @Min(1, { message: CartsError.AtLeastOneProduct })
  quantity: number;
}
