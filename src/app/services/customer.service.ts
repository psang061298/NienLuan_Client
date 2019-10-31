import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.class';
import { Product } from '../models/product.class';
import { Brand } from '../models/brand.class'
import { User } from '../models/user.class';
import { Subject } from 'rxjs';
import { Cart } from '../models/cart_post.class';
import { Address } from '../models/address.class';
import { Cart_Item } from '../models/cart_item.class';
import { Promotion } from '../models/promotion.class';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization' : 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
  })
};



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  usernow = new Subject<User>();
  public user_id = -1;
  public loaded = false;
  constructor(
    private http : HttpClient,
  ){}

  api = 'http://127.0.0.1:8000';

  sendUser(user: User) {
    this.usernow.next(user);    
  }

  getUser(): Observable<User> {
    return this.usernow.asObservable();
  }

  getCategory() : Observable<Category[]>{
    return this.http.get<Category[]>(`${this.api}/categories/`);
  }

  getNewProduct(limit) :Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?limit=${limit}`)
  }

  getProductCateFilter(cate,page) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?category=${cate}&page=${page}`);
  }

  getProductBrandFilter(brand,page) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?brand=${brand}&page=${page}`);
  }

  getProductBothFilter(cate , brand,page) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?category=${cate}&brand=${brand}&page=${page}`);
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

  getProfile() : Observable<User>{
    return this.http.get<User>(`${this.api}/users/`,httpOptions);
  }

  putProfile(id , user) : Observable<User>{
    return this.http.put<User>(`${this.api}/users/${id}/`,user,httpOptions);
  }

  postCart(cart): Observable<Cart>{
    return this.http.post<Cart>(`${this.api}/carts/items/`, cart,httpOptions);
  }

  putCart(id,cart) : Observable<Cart>{
    return this.http.put<Cart>(`${this.api}/carts/items/${id}/`,cart,httpOptions);
  }

  postAddress(address) : Observable<Address>{
    return this.http.post<Address>(`${this.api}/addresses/`, address,httpOptions);
  }

  getCart() : Observable<any>{
    return this.http.get<any>(`${this.api}/carts/`,httpOptions);
  }

  delCart_Item(id) : Observable<Cart>{
    return this.http.delete<Cart>(`${this.api}/carts/items/${id}/`,httpOptions);
  }

  putCart_Item(id , cart) : Observable<Cart_Item>{
    return this.http.patch<Cart_Item>(`${this.api}/carts/items/${id}/`,cart,httpOptions);
  }

  getPromotion() : Observable<Promotion[]>{
    return this.http.get<Promotion[]>(`${this.api}/promotions/`);
  }

}
