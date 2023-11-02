import { OrderItems } from "./order-item";
import { User } from "./user";

export interface Order {
    _id?:string;
    shippingAddress?:string;
    invoiceAddress?:string;
    city?:string;
    country?:string;
    phone?:string;
    status?:string;
    total?:number;
    user?:User[];
    orderItems?:OrderItems[];
}
export interface ResOrders{
    success?: boolean;
    orders: Order[];
}
export interface ResOneOrder{
    success?: boolean;
    orders: Order;
}
