import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  selectedOrder = new Order(new User(),[]);
  orderCollection : Order[] = [];

  constructor(private orderService : OrderService , private toast: ToastrService ) {
    this.selectedOrder = new Order(new User(),[]);
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders()
      .subscribe(res =>{
        this.orderCollection = res as Order[];
      });
  }

  addOrder(form: NgForm){

    if(form.value._id){
      this.orderService.editOrder(form.value)
        .subscribe(res=>{
          if(res){
            this.resetForm(form);
            this.toast.success('Order updated succesfully', 'Success');
            this.getOrders();
          }else{
            this.toast.error('Order could not be updated');
          }
        });
    }else{
      this.orderService.addOrder(form.value)
        .subscribe(res=>{
          this.resetForm(form);
          this.toast.success('USer saved succesfully' , 'Success');
          this.getOrders();
        });
    }
  }


  editOrder(order: Order){
    this.selectedOrder = order;
  }

  deleteOrder(_id: String){
    if(confirm('Are you sure you want delete it?')){
      this.orderService.deleteOrder(_id)
        .subscribe(res=>{
          this.getOrders();
          this.toast.success('Order deleted succeessfully' , 'Success');
        });
    }
  }


  resetForm(form:NgForm){
    if(form){
      form.reset();
      this.selectedOrder = new Order(new User,[]);
    }
  }


}
