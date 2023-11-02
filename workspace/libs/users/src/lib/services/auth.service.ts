import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { StorageService } from './storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authUrl = "http://localhost:4005/api/v1/users"

  constructor(private http: HttpClient, 
    private storageService:StorageService,
    private router: Router) { }

  login(email: string, password: string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.authUrl}/login`,{email, password})
  }

  logout(){
    this.storageService.removeToken()
    this.router.navigate(['/signin']);
  }


  

  
}
