import { IsNotEmpty, IsUUID } from 'class-validator';
import { OrdersError } from '../enums/orders-error.enum';

export class CreateOrderDto {
  @IsNotEmpty({ message: OrdersError.CartIdRequired })
  @IsUUID(4, { message: OrdersError.CartIdShouldBeUUID })
  cartId: string;
}
