import { Injectable } from '@angular/core';
import { Category } from '../../models/category.class';
import { Observable, ObservedValueOf } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brand } from 'src/app/models/brand.class';
import { Product } from 'src/app/models/product.class';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
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
    return this.http.get<Category>(`${this.api}/categories/${id}/`);
  }

  public postCategory(str) : Observable<Category>{
    return this.http.post<Category>(`${this.api}/categories/`,str,httpOptions)
  }

  public putcategory(id,str : Category) : Observable<Category>{
    return this.http.put<Category>(
      `${this.api}/categories/${id}/`,str,
    );
  }

  public getBrand(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.api}/brands/`);
  }

  public getOneBrand(id) : Observable<Brand>{
    return this.http.get<Brand>(`${this.api}/brands/${id}/`);
  }

  public postBrand(str) : Observable<Brand>{
    return this.http.post<Brand>(`${this.api}/brands/`,str,httpOptions);
  }

  public putBrand(id,brand) : Observable<Brand>{
    return this.http.put<Brand>(
      `${this.api}/brands/${id}/`,brand,httpOptions
    );
  }

  public postProduct(pro) : Observable<Product>{
    return this.http.post<Product>(`${this.api}/products/`,pro,httpOptions);
  }

  public getProduct() : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products/`);
  }

  public getProductDetail(id) : Observable<Product>{
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }

  public putProduct(id,product) : Observable<Product>{
    return this.http.put<Product>(`${this.api}/products/${id}/update/`,product,httpOptions);
  }

}
