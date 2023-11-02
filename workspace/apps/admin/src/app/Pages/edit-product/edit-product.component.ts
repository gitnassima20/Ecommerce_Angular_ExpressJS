import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CategoryService } from 'libs/shared/src/lib/services/category.service';
import { ProductService } from 'libs/shared/src/lib/services/product.service';
import { Category, ResCategory } from 'libs/shared/src/lib/models/category';

@Component({
  selector: 'fos-server-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  categories: Category[]=[]

  id: string = ''

  Rating: number[] = [0,1,2,3,4,5]

  uploadedImageSrc: string = './../../assets/blank-image.svg';


  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute){}
  
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.productService.getOnlyProduct(params.id).subscribe(res => {
        this.id = params.id
        this.productForm.patchValue(res.product)
          console.log(res.product)
        
      })
    
   })
 }


  productForm =new  FormGroup({
    title: new UntypedFormControl('',[Validators.required,Validators.min(5),Validators.max(40)]),
    // content: new UntypedFormControl('',[Validators.required,Validators.min(4)]), 
    brand: new UntypedFormControl('',[Validators.required,Validators.min(4),Validators.maxLength(15)]), 
    countStock: new UntypedFormControl(null,[Validators.required,Validators.min(0)]), 
    price: new UntypedFormControl(null,Validators.required),
    thumbnail: new UntypedFormControl('',Validators.required),
    //image: new UntypedFormControl('',[Validators.required,Validators.min(5)]), 
    rating: new UntypedFormControl('',[Validators.required,Validators.min(this.Rating.indexOf(0)),Validators.max(this.Rating.indexOf(5))]),
    isFeatured: new UntypedFormControl(false,[Validators.required]),
    description: new UntypedFormControl('',[Validators.required,Validators.minLength(60),Validators.maxLength(400)]),
    category: new UntypedFormControl('',Validators.required),
  })

  submit(form: FormGroup) {

    if(form.invalid) {
      return
    }
  
    this.updateProduct()
  
  }

  updateProduct(){
    // this.productService.updateProduct(this.id,this.productForm.value).subscribe(res => {
    //   if(res.success) {
    //     this.route.navigate(['/admin/list-product']);
    //   }
    // },
    // err => console.error(err))
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(({success,categories}:ResCategory) =>{
      if(success){
        this.categories = categories
      }
    }
    )
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedImageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

  


