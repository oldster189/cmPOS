import { Unit } from './../../models/Unit';
import { Category } from './../../models/Categories';
import { Product, ProductData } from './../../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private baseUrl = 'http://192.168.200.31:8081/api';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/product`);
  }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category`);
  }

  getUnits(): Observable<Unit> {
    return this.http.get<Unit>(`${this.baseUrl}/unit`);
  }

  addProduct(product: ProductData):Observable<Product>  {
    console.log(product);
    return this.http.post<Product>(`${this.baseUrl}/product`, JSON.stringify(product), { headers: this.headers });
  }

  updateProduct(product: ProductData):Observable<Product>  {
    return this.http.put<Product>(`${this.baseUrl}/product`, JSON.stringify(product), { headers: this.headers });
  }

  deleteProduct(product: ProductData):Observable<Product>  {
    return this.http.delete<Product>(`${this.baseUrl}/product/${product._id}`);
  }

}
