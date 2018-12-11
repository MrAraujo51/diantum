import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  options;
  public currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  /**
   * Creates an instance of AuthService.
   * @param {Http} http
   * @memberof AuthService
   */
  constructor(public http: Http) { }

   // Function to create headers, add token, to be used in HTTP requests
   createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  registerUser(user) {
    this.createAuthenticationHeaders()
    return this.http.post(`${environment.api_url}api/user/register`, user, this.options)
      .map(res => res.json());
  }

  /**
   *
   *
   * @param {any} username
   * @returns
   * @memberof AuthService
   */
  checkUsername(username) {
    this.createAuthenticationHeaders()
    return this.http.get(`${environment.api_url}api/user/checkUsername/${username}`, this.options)
      .map(res => res.json());
  }

   checkEmail(email) {
    this.createAuthenticationHeaders()
    return this.http.get(`${environment.api_url}api/user/checkEmail/${email}`, this.options)
      .map(res => res.json());
  }

  authUser(user) {
    this.createAuthenticationHeaders()
    return this.http.post(`${environment.api_url}api/user/authenticate`, user, this.options)
      .map(res => res.json());
  }

  verifyUser(token) {
    this.createAuthenticationHeaders()
    return this.http.post(`${environment.api_url}api/user/verify`, token, this.options)
      .map(res => res.json());
  }

  getProfile() {
    this.createAuthenticationHeaders()
    return this.http.get(`${environment.api_url}api/user/profile`, this.options)
      .map(res => res.json());
  }

  resetPassword(passwords) {
    this.createAuthenticationHeaders()
    passwords.token = this.authToken.split(' ').splice(-1)[0];
    return this.http.post(`${environment.api_url}api/user/reset`, passwords, this.options)
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('auth_token');
    this.authToken = token;
  }

  loadUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.currentUserSubject.next(user)
  }

  storeUserData(token, user) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
     this.currentUserSubject.next(user);
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('auth_token');
  }

  getCurrentUser() {
    return localStorage.getItem('user')
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
