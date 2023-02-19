import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isAuthenticated = false;

  constructor(private router: Router, private httpClient: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    this.isAuthenticated = true;
    return this.httpClient.post(
      'https://ecommerceiti-heba.onrender.com/users/login',
      obj
    );
  }

  createUser(data: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerceiti-heba.onrender.com/users/signup',
      data
    );
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('mail');
    localStorage.removeItem('password');
    localStorage.removeItem('gender');
    localStorage.removeItem('image');
    localStorage.removeItem('user');
    location.reload();
    this.router.navigate(['']);
  }

  checkLoginStatus() {
    return localStorage.getItem('token');
  }

  // isLogged() {
  //   return localStorage.getItem('token') != null;
  // }
  // IsLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('dataUser');
  // }
  // getToken() {
  //   return localStorage.getItem('token') || '';
  // }
}
