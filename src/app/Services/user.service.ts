import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private myUser:HttpClient) { }
   baseUrl = "https://ecommerceiti-heba.onrender.com/users";
   updateUrl = "https://ecommerceiti-heba.onrender.com/users/update"

   getUsers() {
    return this.myUser.get(this.baseUrl);
   }
  
  //update user
  token= localStorage.getItem('token');
  updateUser(id:any,newUser:any){
  const head = new HttpHeaders().set("Authorization", 'Bearer '+this.token);
   console.log("Bearer " +this.token);
    console.log(this.token);
    console.log(head);
  
    return this.myUser.put(`${this.updateUrl}/${id}`, newUser, {headers:head});
  }

}
