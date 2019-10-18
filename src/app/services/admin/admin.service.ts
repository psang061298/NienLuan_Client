import { Injectable } from '@angular/core';
import { Category } from '../../models/category.class';
import { Observable } from 'rxjs';
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

  public postcategory(str) : Observable<Category>{
    return this.http.post<Category>(`${this.api}/category/`,str)
  }

  public putcategory(id,str : Category) : Observable<Category>{
    return this.http.put<Category>(
      `${this.api}/category/${id}`,str,
    );
  }

  public getBrand(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.api}/brands/`);
  }

  public postProduct(pro) : Observable<Product>{
    return this.http.post<Product>(`${this.api}/products/`,pro,httpOptions);
  }
}
