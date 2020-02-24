import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly URL_API = 'http://localhost:3000/tienda/pedidos';

  constructor(private http: HttpClient){}


  getOrders(){
    return this.http.get(this.URL_API);
  }

  getOrderById(_id: String){
    return this.http.get(this.URL_API+`/${_id}`);
  }

  addOrder(order: Order){
    return this.http.post(this.URL_API, Order);
  }

  editOrder(order: Order){
    return this.http.put(this.URL_API+`/${order._id}`, order);
  }

  deleteOrder(_id: String){
    return this.http.delete(this.URL_API+`/${_id}`);
  }
}
