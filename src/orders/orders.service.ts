import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  async makeRequestToPayU(price: number, order: Order) {
    const res = await axios.post(
      'https://secure.snd.payu.com/api/v2_1/orders',
      {
        notifyUrl: 'https://your.eshop.com/notify',
        customerIp: '127.0.0.1',
        merchantPosId: '300746',
        description: 'E-book shop',
        currencyCode: 'PLN',
        totalAmount: price * 100,
        extOrderId: order.id,
        buyer: {
          email: 'test@test.com',
          phone: '123456789',
          firstName: 'Jan',
          lastName: 'Kowalski',
          language: 'pl',
        },
        products: order.orderProducts.map((orderProduct) => ({
          name: orderProduct.product.title,
          unitPrice: orderProduct.product.price * 100,
          quantity: orderProduct.quantity,
        })),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer d9a4536e-62ba-4f60-8017-6053211d3f47',
        },
        maxRedirects: 0,
        validateStatus: (status) => status === 302,
      },
    );
    return res.data;
  }
}
