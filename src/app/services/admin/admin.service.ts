import { Injectable } from '@angular/core';
import { Category } from '../../models/category.class';
import { Observable, ObservedValueOf, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Brand } from 'src/app/models/brand.class';
import { Product } from 'src/app/models/product.class';
import { User } from 'src/app/models/user.class';
import { Promotion } from 'src/app/models/promotion.class';
import { orderHistory } from 'src/app/models/oderHistory.class';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  })
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  api = 'http://127.0.0.1:8000';
  constructor(
    private http : HttpClient
  ) { 
    if(localStorage.getItem('ACCESS_TOKEN')){
      httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`);
    }
    
  }

  public getcategory(): Observable<Category[]>{
    httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`);
    console.log(httpOptions);
    
    return this.http.get<Category[]>(`${this.api}/categories/`,httpOptions);
  }

  public getOneCategory(id) : Observable<Category>{
    return this.http.get<Category>(`${this.api}/categories/${id}/`,httpOptions);
  }

  public postCategory(str) : Observable<Category>{
    return this.http.post<Category>(`${this.api}/categories/`,str,httpOptions)
  }

  public putcategory(id,str : Category) : Observable<Category>{
    return this.http.put<Category>(
      `${this.api}/categories/${id}/`,str,httpOptions
    );
  }

  public delCategory(id) : Observable<Category>{
    return this.http.delete<Category>(`${this.api}/categories/${id}/`,httpOptions);
  }

  public getBrand(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.api}/brands/`,httpOptions);
  }

  public getOneBrand(id) : Observable<Brand>{
    return this.http.get<Brand>(`${this.api}/brands/${id}/`,httpOptions);
  }

  public postBrand(str) : Observable<Brand>{
    return this.http.post<Brand>(`${this.api}/brands/`,str,httpOptions);
  }

  public putBrand(id,brand) : Observable<Brand>{
    return this.http.put<Brand>(`${this.api}/brands/${id}/`,brand,httpOptions);
  }

  public delBrand(id) : Observable<Brand>{
    return this.http.delete<Brand>(`${this.api}/brands/${id}/`,httpOptions);

  }

  public postProduct(pro) : Observable<Product>{
    return this.http.post<Product>(`${this.api}/products/`,pro,httpOptions);
  }

  public getProduct(page) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/?page=${page}`);
  }

  public getProductDetail(id) : Observable<Product>{
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }

  public putProduct(id,product) : Observable<Product>{
    return this.http.put<Product>(`${this.api}/products/${id}/update/`,product,httpOptions);
  }

  public delProduct(id) : Observable<Product>{
    return this.http.delete<Product>(`${this.api}/products/${id}/`,httpOptions);
  }

  public getUser() : Observable<User[]>{
    httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`)
    return this.http.get<User[]>(`${this.api}/users/`,httpOptions);
  }

  public setActive(id,str) : Observable<any>{
    return this.http.patch<any>(`${this.api}/users/${id}/`,str,httpOptions);
  }

  public getPromotion() : Observable<Promotion[]>{
    return this.http.get<Promotion[]>(`${this.api}/promotions/`);
  }

  public getOnePromotion(id) : Observable<Promotion>{
    return this.http.get<Promotion>(`${this.api}/promotions/${id}/`, httpOptions);
  }

  public postPromotion(promo) : Observable<Promotion>{
    return this.http.post<Promotion>(`${this.api}/promotions/`,promo,httpOptions);
  }

  public putPromotion(id, promo) : Observable<Promotion>{
    return this.http.put<Promotion>(`${this.api}/promotions/${id}/update/`,promo,httpOptions);
  }

  public delPromotion(id) : Observable<Promotion>{
    return this.http.delete<Promotion>(`${this.api}/promotions/${id}/`,httpOptions);
  }

  public getOrder(page) : Observable<any>{
    httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`)
    return this.http.get<any>(`${this.api}/orders/?page=${page}`,httpOptions);
  }

  public getOrderDetail(id) : Observable<orderHistory>{
    return this.http.get<orderHistory>(`${this.api}/orders/${id}/`,httpOptions);
  }

  public changeStatus(id, status) : Observable<any>{
    return this.http.patch<any>(`${this.api}/orders/${id}/update/`,status,httpOptions);
  }

  public getStatistics() : Promise<any>{
    return this.http.get(`${this.api}/statistics/`).toPromise()
    .catch(err => {
        return Promise.reject(err.json().error  || 'Server error');
    });;
  }

  public getInStock() : Observable<any>{
    return this.http.get<any>(`${this.api}/in_stock/`)
  }

  public changePass(id,str) : Observable<any>{
    return this.http.patch<any>(`${this.api}/users/${id}/`,str, httpOptions)
  }

}
