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
import jwtDecode from 'jwt-decode'
import { orderHistory } from '../models/oderHistory.class';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization' : 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
  })
};

const httpOptionsNonToken = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization' : 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
  })
};



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  usernow = new Subject<User>();
  public user_id : number;
  // = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))['user_id'];
  public loaded = false;
  constructor(
    private http : HttpClient,
  ){
    if(localStorage.getItem('ACCESS_TOKEN')){
      this.user_id = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))['user_id'];
    }
  }

  api = 'http://127.0.0.1:8000';

  sendUser(user: User) {
    this.usernow.next(user);    
  }

  getUser(): Observable<User> {
    return this.usernow.asObservable();
  }

  getCategory() : Observable<Category[]>{
    return this.http.get<Category[]>(`${this.api}/categories/`,httpOptionsNonToken);
  }

  getNewProduct(limit) :Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?limit=${limit}`,httpOptionsNonToken)
  }

  getProductCateFilter(cate,page,gt,lt) : Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/products/?category=${cate}&page=${page}&gt=${gt}&lt=${lt}`,httpOptionsNonToken);
  }

  getProductBrandFilter(brand,page,gt,lt) : Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/products/?brand=${brand}&page=${page}&gt=${gt}&lt=${lt}`,httpOptionsNonToken);
  }

  getProductBothFilter(cate , brand,page,gt,lt) : Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/products/?category=${cate}&brand=${brand}&page=${page}&gt=${gt}&lt=${lt}`,httpOptionsNonToken);
  }

  getBrand(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.api}/brands/`,httpOptionsNonToken);
  }

  getOneProduct(id) : Observable<Product>{
    return this.http.get<Product>(`${this.api}/products/${id}/`,httpOptionsNonToken);
  }

  register(user) : Observable<User>{
    return this.http.post<User>(`${this.api}/users/signup/`, user,httpOptionsNonToken);
  }

  getProfile() : Observable<User>{
    return this.http.get<User>(`${this.api}/users/`,httpOptions);
  }

  putProfile(user) : Observable<User>{
    return this.http.put<User>(`${this.api}/users/profile/`,user,httpOptions);
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
    return this.http.get<any>(`${this.api}/carts/items/`,httpOptions);
  }

  delCart_Item(id) : Observable<Cart>{
    return this.http.delete<Cart>(`${this.api}/carts/items/${id}/`,httpOptions);
  }

  putCart_Item(id , cart) : Observable<Cart_Item>{
    return this.http.put<Cart_Item>(`${this.api}/carts/items/${id}/`,cart,httpOptions);
  }

  getPromotion() : Observable<Promotion[]>{
    return this.http.get<Promotion[]>(`${this.api}/promotions/`,httpOptionsNonToken);
  }

  payment(checkout) : Observable<any>{
    return this.http.post<any>(`${this.api}/orders/`, checkout ,httpOptions);
  }

  getOldOrder() : Observable<orderHistory[]>{
    return this.http.get<orderHistory[]>(`${this.api}/orders/`,httpOptions);
  }

  public search(str) : Promise<any>{
    return this.http.get(`${this.api}/products/?name=${str}`,httpOptionsNonToken).toPromise()
    .catch(err => {
        return Promise.reject(err.json().error  || 'Server error');
    });
  }

  public changeStatus(id,status) : Observable<any>{
    return this.http.patch<any>(`${this.api}/orders/${id}/update/`,status, httpOptions)
  }

  public changePass(str) : Observable<any>{
    return this.http.patch<any>(`${this.api}/users/password/`,str, httpOptions)
  }
}
