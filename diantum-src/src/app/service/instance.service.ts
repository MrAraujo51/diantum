import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service'
import { environment } from '../../environments/environment';

@Injectable()
export class InstanceService {

  options: RequestOptions;

  constructor(
    public authService: AuthService,
    public http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  registerInstance(instanceToken) {
    this.createAuthenticationHeaders()
    return this.http.post(`${environment.api_url}api/instance/register`, instanceToken, this.options)
      .map(res => res.json());
  }

  getInstances() {
    this.createAuthenticationHeaders()
    return this.http.get(`${environment.api_url}api/instance`, this.options)
      .map(res => res.json());
  }

  changeRol(req) {
    this.createAuthenticationHeaders()
    return this.http.post(`${environment.api_url}api/instance/change-rol`, req, this.options)
      .map(res => res.json());
  }

  getUsers(ins) {
    this.createAuthenticationHeaders()
    return this.http.get(`${environment.api_url}api/instance/suscriptions/${ins}`, this.options)
      .map(res => res.json());
  }

  getParameters(id) {
    this.createAuthenticationHeaders()
    return this.http.get(`${environment.api_url}api/instance/params/${id}`, this.options)
      .map(res => res.json())
  }

  changeParameters(id, params) {
    this.createAuthenticationHeaders();
    return this.http.post(`${environment.api_url}api/instance/params/${id}`, params, this.options)
      .map(res => res.json())
  }

  saveLog(id, log) {
    const logSaved = {
      id: id,
      log: log
    }
    this.createAuthenticationHeaders()
    return this.http.post(`${environment.api_url}api/instance/save-log`, logSaved, this.options)
      .map(res => res.json())
  }

}
