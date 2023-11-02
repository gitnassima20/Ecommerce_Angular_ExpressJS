import { Component, OnInit } from '@angular/core';
import { StorageService } from 'libs/users/src/lib/services/storage.service';

@Component({
  selector: 'fos-server-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
 
})
export class DashboardComponent implements OnInit {


  name:string =''

  constructor(private storageService: StorageService){}

  ngOnInit(): void {
    this.storageService.userNameSubject$.subscribe((name:string) =>{
      this.name = name;
    } )
  }
  
  
 
  
}
