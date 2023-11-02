import { StorageService } from './../../../../libs/users/src/lib/services/storage.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "fos-server-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit{
  title = "fos";

  constructor(private storageService: StorageService){}

  ngOnInit(): void {
    this.storageService.userNameSubject$
  }
  

}
