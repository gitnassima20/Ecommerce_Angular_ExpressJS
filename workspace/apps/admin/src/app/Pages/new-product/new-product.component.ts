import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Category, ResCategory } from 'libs/shared/src/lib/models/category';
import { Product } from 'libs/shared/src/lib/models/product';
import { CategoryService } from 'libs/shared/src/lib/services/category.service';
import { ProductService } from 'libs/shared/src/lib/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fos-server-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  Rating: number[] = [0,1,2,3,4,5]
  thumbnail : any ;

  myProduct: Product = {
    title: '',
    brand: '',
    countStock: 0,
    price: 0,
    thumbnail: '',
    rating: 0,
    isFeatured:false,
    description: '',
    
  }

  categories : Category[] = [];

  uploadedImageSrc: string = './../../assets/blank-image.svg';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private location: Location,
    private router:Router){}
  
  ngOnInit() {
      this.getCategories()
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
   
  getCategories(){
    this.categoryService.getCategories().subscribe(({success,categories}:ResCategory) =>{
      if(success){
        this.categories = categories
      }
    }
    )
  }
  
  submit(form: FormGroup) {

    if(form.invalid) {
      return
    }

    this.saveProduct()

  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return ;
        }
        this.thumbnail = file;
    }
  }



  saveProduct(){

    const formData = new FormData() ;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const product = {
      title: this.productForm.controls['title'].value,
      brand:this.productForm.controls['brand'].value,
      countStock: this.productForm.controls['countStock'].value,
      price: this.productForm.controls['price'].value ,
      rating: this.productForm.controls['rating'].value,
      isFeatured: this.productForm.controls['isFeatured'].value,
      description: this.productForm.controls['description'].value,
      category : this.productForm.controls['category'].value
    }
    formData.append('thumbnail', this.thumbnail);
    // console.log(formData.get('thumbnail'));
    // console.log(formData)
    formData.append('product' , JSON.stringify(product) ) ; 
    this.productService.addProduct(formData).subscribe(() => {
      setTimeout(() => {
        this.router.navigate(['/admin/list-product'])
      }, 1000);
    })
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
