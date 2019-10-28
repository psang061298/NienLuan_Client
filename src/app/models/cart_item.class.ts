import { Product } from './product.class';

export class Cart_Item{
    quantity: number;
    final_price: number;
    paid: boolean;
    product: Product;
    order ?: number
}