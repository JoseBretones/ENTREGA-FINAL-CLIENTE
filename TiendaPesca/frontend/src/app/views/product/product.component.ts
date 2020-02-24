import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductsService]
})
export class ProductComponent implements OnInit {
  selectedProduct = new Product;
  productCollection : Product[] = [];
  constructor(private productService : ProductsService , private toast: ToastrService ) {
    this.selectedProduct = new Product();
  }

  ngOnInit() {
    this.getProducts();

  }

  addProduct(form:NgForm){
    if(form.value._id){
      this.productService.editProduct(form.value)
        .subscribe(res =>{
          if(res){
          this.resetForm(form);
          this.toast.success('Product updated successfully' , 'Success');
          this.getProducts();
          }else{
            this.toast.error('Product could not be updated');
          }

        });

    }else{

      this.productService.createProduct(form.value)
      .subscribe( res=>{
        this.resetForm(form);
        this.toast.success('Product saved successfully');
        this.getProducts();
      });
    }
  }
  resetForm(form:NgForm){
    if(form){
      form.reset();
      this.selectedProduct = new Product();
    }
  }
  getProducts(){
    this.productService.getProducts()
      .subscribe( res =>{
        this.productCollection = res as Product[];
      });
  }
  editProduct(product: Product){
    this.selectedProduct = product;

  }
  deleteProduct(_id: String){
    if(confirm('Are you sure you want delete it?')){
      this.productService.deleteProduct(_id)
        .subscribe(res=>{
          this.getProducts();
          this.toast.success('Product deleted successfully');
        });
    }
  }
}
