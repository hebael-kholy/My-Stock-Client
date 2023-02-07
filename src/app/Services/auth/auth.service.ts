import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private router:RouterModule ,private httpClient:HttpClient){}

  onLogin(obj:any): Observable<any>{
    return this.httpClient.post('https://ecommerceiti-heba.onrender.com/users/login', obj);
  }

  createUser(data:any): Observable<any>{
    return this.httpClient.post("https://ecommerceiti-heba.onrender.com/users/signup", data);
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
