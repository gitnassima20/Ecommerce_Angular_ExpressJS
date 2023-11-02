import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ResOneProduct, ResProducts } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:4005/api/v1/products'

  constructor(private http:HttpClient) { }

  getProducts():Observable<ResProducts>{
    return this.http.get<ResProducts>(this.apiUrl);
  }

  addProduct(data:any):Observable<Product> {
    return this.http.post<Product>(this.apiUrl,data)
  }
   
  getOnlyProduct(id:string):Observable<ResOneProduct>{
    return this.http.get<ResOneProduct>(`${this.apiUrl}/${id}`);
  }
  updateProduct(id: string, product: FormData): Observable<ResOneProduct> {
    return this.http.patch<ResOneProduct>(`${this.apiUrl}/${id}`,product);
  }

  putProduct(_id: string | undefined, data: Product){
    return this.http.put<Product>(`${this.apiUrl}/${_id}`, data);
  }

  patchProduct(_id: string | undefined, data: Product){
    return this.http.patch<Product>(`${this.apiUrl}/${_id}`, data);
  }

  deleteProduct(_id: string | undefined){
    return this.http.delete<Product>(`${this.apiUrl}/${_id}`);
  }
}
