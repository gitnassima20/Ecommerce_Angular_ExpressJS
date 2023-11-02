import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ResCategory, ResOneCategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  apiUrl :string = 'http://localhost:4005/api/v1/categories'

  constructor(private http:HttpClient) { }

  getCategories():Observable<ResCategory>{
    return this.http.get<ResCategory>(this.apiUrl);
  }

  getOnlyCategory(id:string):Observable<ResOneCategory>{
    return this.http.get<ResOneCategory>(`${this.apiUrl}/${id}`);
  }

  addCategory(data : Category){
    return this.http.post<Category[]>(this.apiUrl,data);
  }

  updateCategory(id: string, category: Category): Observable<ResOneCategory> {
    return this.http.patch<ResOneCategory>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string | undefined){
    return this.http.delete<Category>(`${this.apiUrl}/${id}`);
  }




}
