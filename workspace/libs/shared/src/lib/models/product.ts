import { Category } from "./category";

export interface Product{

    _id?: string;
    title?: string;
    description?: string;
    brand?: string;
    countStock?: number;
    price?: number;
    thumbnail?: string;
    //image?: string[];
    rating?: number;
    isFeatured?: boolean;
    created_at?: Date;
    updated_at?: Date;
    category?: Category

}

export interface ResProducts{
    success?: boolean;
    products:Product[];
}

export interface ResOneProduct{
    success?: boolean;
    product: Product;
}