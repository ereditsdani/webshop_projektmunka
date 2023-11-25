import { OrderItem } from './OrderItem';
import { Product } from './Product';
import { User } from './User';

export class Order {
  id: number = 0;
  timestamp: string = '';
  user?: User;
  paymentMethod: string = '';
  shipmentMethod: string = '';
  orderItems: OrderItem[] = [];
}
