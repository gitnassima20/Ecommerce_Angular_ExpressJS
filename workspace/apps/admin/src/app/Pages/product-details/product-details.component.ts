import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'libs/shared/src/lib/models/product';

@Component({
  selector: 'fos-server-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  @Input() product: Product | undefined;
  @Output() viewInfo = new EventEmitter<Product>();

  onViewInfoClick() {
    this.viewInfo.emit(this.product);
  }


}
