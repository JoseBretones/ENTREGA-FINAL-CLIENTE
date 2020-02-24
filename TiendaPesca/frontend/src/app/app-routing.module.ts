import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './views/order/order.component';
import { UserComponent } from './views/user/user.component';
import { ProductComponent } from './views/product/product.component';
import { HomeComponent } from './views/home/home.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'product' , component: ProductComponent},
  {path: 'user' , component: UserComponent},
  {path: 'order' , component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
