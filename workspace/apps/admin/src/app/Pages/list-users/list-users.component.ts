import { Component, OnInit } from '@angular/core';
import { ResUsers, User } from 'libs/shared/src/lib/models/user';
import { UserService } from './../../../../../../libs/shared/src/lib/services/user.service';

@Component({
  selector: 'fos-server-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[]=[];

  constructor(private userService: UserService){}

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(({success,users}:ResUsers) => {
      if(success){
        this.users = users;
      }
    });
  }

}
