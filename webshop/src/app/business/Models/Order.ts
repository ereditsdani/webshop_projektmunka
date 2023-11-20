import { OrderItem } from './OrderItem';
import { Product } from './Product';

export class Order {
  id: number = 0;
  timestamp: string = '';
  userId: number = 0;
  paymentMethod: string = '';
  shipmentMethod: string = '';
  orderItems: OrderItem[] = [];
}
