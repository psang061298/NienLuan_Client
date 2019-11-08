import { Injectable } from '@angular/core';
import { Category } from '../../models/category.class';
import { Observable, ObservedValueOf } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brand } from 'src/app/models/brand.class';
import { Product } from 'src/app/models/product.class';
import { User } from 'src/app/models/user.class';
import { Promotion } from 'src/app/models/promotion.class';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  

  api = 'http://127.0.0.1:8000';
  constructor(
    private http : HttpClient
  ) { }

  public getcategory(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.api}/categories/`);
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

  public getBrand(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.api}/brands/`);
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

  public getUser() : Observable<User[]>{
    return this.http.get<User[]>(`${this.api}/users/`, httpOptions);
  }

  public getPromotion() : Observable<Promotion[]>{
    return this.http.get<Promotion[]>(`${this.api}/promotions/`, httpOptions);
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

  public getOrder() : Observable<any>{
    return this.http.get<any>(`${this.api}/orders/`,httpOptions);
  }


}
