import { Product } from "./product";

export interface OrderItems {
    product?:Product[];
    quantity?:number;
    price?:number
}