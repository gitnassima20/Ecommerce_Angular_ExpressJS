import { Injectable } from '@angular/core';
import { ResUsers } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:4005/api/v1/users"

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<ResUsers>{
    return this.http.get<ResUsers>(this.apiUrl)
  }
}
