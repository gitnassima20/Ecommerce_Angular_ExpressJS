import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule} from '@angular/common/http';
import { UserpipePipe } from './pipes/userpipe.pipe'

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    UserpipePipe
  ]
})
export class SharedModule {}
