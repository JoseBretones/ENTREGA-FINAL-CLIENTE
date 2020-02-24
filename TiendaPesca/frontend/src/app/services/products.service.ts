import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly URL_API = 'http://localhost:3000/tienda/productos';

  constructor(private http: HttpClient) {
  }

getProducts(){
  return this.http.get(this.URL_API);
}

getProductById(_id: String){
  return this.http.get(this.URL_API+`/${_id}`);
}

createProduct(product: Product){
  return this.http.post(this.URL_API, product);
}

editProduct(product: Product){
  return this.http.put(this.URL_API+`/${product._id}`, product);
}

deleteProduct(_id: String){
  return this.http.delete(this.URL_API+`/${_id}`);
}

}
