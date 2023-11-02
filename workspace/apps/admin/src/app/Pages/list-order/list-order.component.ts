import { Component, OnInit } from '@angular/core';
import { Order, ResOrders } from 'libs/shared/src/lib/models/order';
import { OrderService } from './../../../../../../libs/shared/src/lib/services/order.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'fos-server-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService:OrderService ){}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(({success,orders}:ResOrders)=> {
      if(success){
        this.orders = orders
      }
    })
  }
  toggleStatus(order: Order): void {
    switch (order.status) {
      case 'pending':
        order.status = 'shipped';
        break;

      case 'shipped':
        order.status = 'received';
        break;

      case 'received':
        order.status = 'canceled';
        break;

      case 'canceled':
        order.status = 'pending'
        break;

      default:
        break;
    }
  }

  getStatusClass(order: Order): string {
    switch (order.status) {
      case 'pending':
        return 'bg-label-warning';

      case 'shipped':
        return 'bg-label-info';

      case 'received':
        return 'bg-label-primary';
      
      case 'canceled':
        return 'bg-label-danger';

      default:
        return '';
    }
  }

  removeOrder(id: string | undefined) {
    if (typeof id === 'string') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.orderService.deleteOrder(id).subscribe((response : any) => {
            this.orders = this.orders.filter(order => order._id != id);
            Swal.fire({
              title: 'Deleted!',
              text: 'The order has been deleted.',
              icon: 'success',
              timer: 3000
            });
          });
        }
      });
    } else {
      console.error('Invalid id');
      return
    }
  }
  
  



}
