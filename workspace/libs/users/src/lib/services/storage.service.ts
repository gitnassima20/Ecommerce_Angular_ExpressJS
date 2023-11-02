import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly APP_TOKEN = 'app_token'
  private readonly USERNAME = 'username'

  userNameSubject$ = new BehaviorSubject<string>('')



  setToken(data: string){

    localStorage.setItem(this.APP_TOKEN, data)
  }

  getToken(){
    return localStorage.getItem(this.APP_TOKEN)
  }

  removeToken(){
    localStorage.removeItem(this.APP_TOKEN)
    this.setName('')
    
  }

  expiredToken(expiration: number):boolean{
    return Math.floor(new Date().getTime() /1000) >= expiration
  }

  setName(name:string ){
    this.userNameSubject$.next(name)
  }
}
