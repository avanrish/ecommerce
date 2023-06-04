export enum CartsError {
  CartIdShouldBeString = 'carts.cartId.shouldBeString',
  CartIdShouldBeUUID = 'carts.cartId.shouldBeUUID',
  CartIsOrdered = 'carts.cart.isOrdered',
  CartNotFound = 'carts.cart.notFound',
  ProductIdEmpty = 'carts.productId.empty',
  ProductIdShouldBeInt = 'carts.productId.shouldBeInt',
  QuantityEmpty = 'carts.quantity.empty',
  QuantityShouldBeInt = 'carts.quantity.shouldBeInt',
  AtLeastOneProduct = 'carts.quantity.atLeastOneProduct',
  ProductNotFound = 'carts.product.notFound',
}
