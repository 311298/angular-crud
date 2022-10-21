import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDropDown, IProduct } from './Model/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:3000/productList"

  constructor(private http: HttpClient) { }

  // product api
  postProduct(data: IProduct) {
    return this.http.post<IProduct>(this.baseUrl, data)
  }

  getProduct() {
    return this.http.get<IProduct[]>(this.baseUrl)
  }

  putProduct(editData: IProduct, id: number) {
    return this.http.put<IProduct>("http://localhost:3000/productList" + '/' + id, editData)
  }

  deleteProduct(id: number) {
    return this.http.delete<IProduct>(this.baseUrl + '/' + id)
  }

  //dropDown api
  getDropDown() {
    return this.http.get<any>("http://localhost:3001/dropDown")
  }
}
