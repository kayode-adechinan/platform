import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./product";
import {Observable} from "rxjs";
import {PagedProduct} from "./paged-product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL = 'http://localhost:8080/api/v1';


  constructor(private http: HttpClient) {
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/products`, product);
  }

  findAll(): Observable<PagedProduct> {
    return this.http.get<PagedProduct>(`${this.BASE_URL}/products`);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }

  update(id: number, product: Product ): Observable<Product>{
    return this.http.put<Product>(`${this.BASE_URL}/products/${id}`, product);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/products/${id}`);
  }



}
