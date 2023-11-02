import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../models/authResponse';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fos-server-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  authError = false;
  messageError = "Error: please try again"

  loginForm = new FormGroup({
    email: new UntypedFormControl('',Validators.required),
    password: new UntypedFormControl('', Validators.required)
  })

  constructor(private authService: AuthService,
     private storageService: StorageService, 
     private router: Router){}

  signIn(email: string, password: string){
    this.authService.login(email, password).subscribe({
      next: (res: AuthResponse) => {
        this.storageService.setToken(res.token)
        console.log(res.token)
        this.router.navigate(['/admin'])
        this.authError = false
        this.loginForm.reset()
      },
      error: (err: HttpErrorResponse) => {
        this.authError = true
        if(err.status == 400){
          this.messageError = err.error.message
        }
      }
    })
  }

  submit(){
    if(this.loginForm.invalid){
      return
    }

    this.signIn(this.form.email.value, this.form.password.value)
  }

  get form(){
    return this.loginForm.controls
  }

}
