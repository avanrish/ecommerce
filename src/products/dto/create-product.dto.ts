import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductsError } from '../enums/products-error.enum';

export class CreateProductDto {
  @IsNotEmpty({ message: ProductsError.TitleEmpty })
  @IsString({ message: ProductsError.TitleShouldBeString })
  @ApiProperty()
  title: string;

  @IsNotEmpty({ message: ProductsError.AuthorEmpty })
  @IsString({ message: ProductsError.AuthorShouldBeString })
  @ApiProperty()
  author: string;

  @IsNotEmpty({ message: ProductsError.PriceEmpty })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: ProductsError.PriceShouldBeNumber },
  )
  @IsPositive({ message: ProductsError.PriceShouldBePositive })
  @ApiProperty()
  price: number;
}
