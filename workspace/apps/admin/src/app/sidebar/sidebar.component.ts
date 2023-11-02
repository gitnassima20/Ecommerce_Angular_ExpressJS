import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'libs/users/src/lib/services/auth.service';
import { StorageService } from 'libs/users/src/lib/services/storage.service';

@Component({
  selector: 'fos-server-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  title = 'admin';

  name: string = ''

  constructor(private storageService: StorageService,
    private auth: AuthService,
    private route : ActivatedRoute,public router:Router){}

  ngOnInit(): void {
    this.storageService.userNameSubject$.subscribe((name: string) =>{
      this.name = name;
    } )
  }

  logout(){
    this.auth.logout()
  }

}
