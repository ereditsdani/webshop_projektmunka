import { ProductCategory } from './ProductCategory';
import { Vendor } from './Vendor';

export class Product {
  id: number = 0;
  productName: string = '';
  productDescription: string = '';
  price: number = 0;
  discount?: number;
  quantity: number = 0;
  productCategory?: ProductCategory;
  productVendor?: Vendor;
  trending: boolean = false;
  imageUrl: string = '';
  ourChoice: boolean = false;
  orderAmount: number = 0;
}
