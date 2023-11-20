import { Product } from './Product';

export class OrderItem {
  id: number = 0;
  product?: Product;
  orderId: number = 0;
  quantity: number = 0;
}
