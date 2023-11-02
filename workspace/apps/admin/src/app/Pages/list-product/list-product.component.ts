import { ProductService } from './../../../../../../libs/shared/src/lib/services/product.service';
import { Product, ResProducts } from './../../../../../../libs/shared/src/lib/models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fos-server-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit { 

  products:Product[] = []

  selectedProduct: Product | undefined;

  constructor(private productService: ProductService){}

  ngOnInit() {
    this.getProducts(); 
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getProducts(){
    this.productService.getProducts().subscribe(({success,products}:ResProducts)=>{
      if(success){
        this.products = products
        console.log(products)
      }
    }
    )
  }
  
  removeProduct(_id: string | undefined) {
    
    this.productService.deleteProduct(_id).subscribe((response) => {
      this.products = this.products.filter(product => product._id != _id)
     
    })
  }
  

}
