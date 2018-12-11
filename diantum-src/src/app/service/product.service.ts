/*
 * @Author: Manuel Araujo
 * @Date: 2017-07-25 16:18:52
 * @Last Modified time: 2017-07-25 16:18:52
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(public http: Http) { }

  getProducts() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.api_url}api/product`, {headers: headers})
      .map(res => res.json());
  }
    getProduct(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.api_url}api/product/${id}`, {headers: headers})
      .map(res => res.json());
  }

    saveProduct(product) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.api_url}api/product`, product, {headers: headers})
      .map(res => res.json());
  }

    updateProduct(product) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${environment.api_url}api/product/${product._id}`, product, {headers: headers})
      .map(res => res.json());
  }

    deleteProduct(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`${environment.api_url}api/product/${id}`, {headers: headers})
      .map(res => res.json());
  }

}
