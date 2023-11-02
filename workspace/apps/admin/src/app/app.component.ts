import { Component, OnInit } from '@angular/core';
import { AuthService } from 'libs/users/src/lib/services/auth.service';
import { StorageService } from 'libs/users/src/lib/services/storage.service';


@Component({
  selector: 'fos-server-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit{
  title = 'admin';

  name: string = ''

  constructor(private storageService: StorageService,
    private auth: AuthService){}

  ngOnInit(): void {
    this.storageService.userNameSubject$.subscribe((name: string) =>{
      this.name = name;
    } )
  }

  logout(){
    this.auth.logout()
  }
}
