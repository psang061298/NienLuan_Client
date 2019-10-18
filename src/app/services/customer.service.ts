import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.class';
import { Product } from '../models/product.class';
import { Brand } from '../models/brand.class'
import { User } from '../models/user.class';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public loaded = false;

  constructor(
    private http : HttpClient,
  ){}

  api = 'http://127.0.0.1:8000';

  getCategory() : Observable<Category[]>{
    return this.http.get<Category[]>(`${this.api}/categories/`);
  }

  getNewProduct(limit) :Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?limit=${limit}`)
  }

  getProductCateFilter(cate) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?category=${cate}`);
  }

  getProductBrandFilter(brand) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?brand=${brand}`);
  }

  getProductBothFilter(cate , brand) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?category=${cate}&brand=${brand}`);
  }

  getBrand(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.api}/brands/`);
  }

  getOneProduct(id) : Observable<Product>{
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }

  register(user) : Observable<User>{
    return this.http.post<User>(`${this.api}/users/`, user,httpOptions);
  }


}
