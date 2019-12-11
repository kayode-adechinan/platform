import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  BASE_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  upload(data):Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/files`, data);
  }

  multiUpload(data):Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/files/multi-upload`, data);
  }


}
