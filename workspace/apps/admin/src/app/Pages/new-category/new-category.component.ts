import { Component } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Category } from 'libs/shared/src/lib/models/category';
import { CategoryService } from 'libs/shared/src/lib/services/category.service';

@Component({
  selector: 'fos-server-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {

  categories: Category[]=[]

  constructor(private categoryService:CategoryService){}

  categoryForm = new FormGroup({
    label : new UntypedFormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    icon : new UntypedFormControl('',Validators.required),
    color: new UntypedFormControl('',Validators.required)
  })

  saveCategory(){
    console.log(this.categoryForm.value);
    if (this.categoryForm.invalid){
      alert("Please verify the fields");
      return;
    }
    
    let {label, icon, color}=this.categoryForm.value
    this.categoryService.addCategory({label,icon,color}).subscribe((response :any) => {
      this.categories = [response, ...this.categories];
     
    });

  }
}
