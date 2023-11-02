import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from 'libs/shared/src/lib/services/category.service';

@Component({
  selector: 'fos-server-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  
  id: string= ""
 
  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location){}

  categoryForm = new FormGroup({
    label : new UntypedFormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    icon : new UntypedFormControl('',Validators.required),
    color: new UntypedFormControl('',Validators.required)
  })

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
        this.categoryService.getOnlyCategory(params.id).subscribe(res => {
          this.id = params.id
          this.categoryForm.patchValue(res.myCategory)
          console.log(res.myCategory)
        })
    })
}

submit(form: FormGroup) {

  if(form.invalid) {
    return
  }

  this.updateCategory()

}


  updateCategory(){
    this.categoryService.updateCategory(this.id, this.categoryForm.value).subscribe(res => {
      if(res.success) {
       this.location.back()
      }
    },
    err => console.error(err))
  }

}
