import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private myUser:HttpClient) { }
   baseUrl = "https://ecommerceiti-heba.onrender.com/users";
  //get one user
  getOneUser(id:any){
    return this.myUser.get(`${this.baseUrl}`);
  }
  //update user
  updateUser(id:any, newUser:any){
    return this.myUser.put(`${this.baseUrl}/${id}`,newUser)
  }
}
