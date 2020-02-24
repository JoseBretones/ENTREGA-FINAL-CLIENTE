import {Product} from './product';
import {User} from './user';

export class Order {
  _id: String;
  productCollection: Product [];
  user: User;
  orderNumber: number;
  cash: number

  constructor(user: User = new User(),[]){
    this._id = '';
    this.productCollection = [];
    this.user = user;
    this.orderNumber = 0;
    this.cash = 0;
  }
}
