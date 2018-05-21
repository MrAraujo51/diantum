import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  authToken: any;

  constructor(public http: Http) { }

  updateData(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.api_url}api/client`, data, {headers: headers})
      .map(res => res.json());
  }

  getData() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.api_url}api/client`, {headers: headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('auth_token');
    this.authToken = token;
  }
}
