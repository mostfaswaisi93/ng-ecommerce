import { Product } from './product';

export class CartItem {
  id: number;
  // tslint:disable-next-line:variable-name
  total_products: number;
  products: Product[];
}
