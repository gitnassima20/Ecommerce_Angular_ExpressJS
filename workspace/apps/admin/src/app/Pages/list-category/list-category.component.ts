import { Category, ResCategory } from 'libs/shared/src/lib/models/category';
import { CategoryService } from './../../../../../../libs/shared/src/lib/services/category.service';
import { Component, OnInit } from '@angular/core';
//import swal from 'sweetalert';


@Component({
  selector: 'admin-listcategory',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
  providers: [CategoryService]
})
export class ListCategoryComponent implements OnInit {

  categories : Category[] = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit() {
   this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(({success,categories}:ResCategory) =>{

      if(success){
        this.categories = categories
        console.log(categories)
      }
    }
    )
  }

  removeCategory(_id: string | undefined) {

    this.categoryService.deleteCategory(_id).subscribe((response) => {
      this.categories = this.categories.filter(categorie => categorie._id != _id)
     
    })
  }

}
