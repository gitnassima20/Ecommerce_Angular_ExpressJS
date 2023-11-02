import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: string | null = this.storageService.getToken()
      if(!token){
        return this.reject();
      }
      
      if(token.split('.').length == 3){
        const payload = token.split('.')[1]
        const {isAdmin, exp ,username} = JSON.parse(atob(payload));
        this.storageService.setName(username)
        return isAdmin && !this.storageService.expiredToken(exp)
      }

    return true;
  }

  reject(){
    this.storageService.removeToken()
    this.router.navigate(['/signin'])
    return false;
  }

  constructor(private storageService: StorageService, private router: Router){}
}
