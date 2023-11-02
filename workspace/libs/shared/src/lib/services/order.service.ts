import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, ResOneOrder, ResOrders } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl :string = 'http://localhost:4005/api/v1/orders'

  constructor(private http: HttpClient) { }

  getOrders():Observable<ResOrders>{
    return this.http.get<ResOrders>(this.apiUrl);
  }

  patchOrders(id: string | undefined, data: Order):Observable<ResOneOrder> {  // <-- include data object as argument
    return this.http.put<ResOneOrder>(`${this.apiUrl}/${id}`,data);  // <-- pass data object to patch method
  }

  deleteOrder(id:string):Observable<Order>{
    return this.http.delete<Order>(`${this.apiUrl}/${id}`)
  }
}
