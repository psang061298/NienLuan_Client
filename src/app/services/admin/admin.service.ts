import { Injectable } from '@angular/core';
import { Category } from '../../models/category.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Brand } from 'src/app/models/brand.class';

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
}
