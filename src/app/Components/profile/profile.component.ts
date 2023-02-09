import { HttpClient ,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  idUser :any;
  user:any;
  username :any;
  mail:any;
  token:any;
  imagePath:any;
  constructor(myActivated:ActivatedRoute,public myService:UserService){ }
  ngOnInit(): void {

         this.token= localStorage.getItem('token'); 
         console.log(this.token);
         this.username = localStorage.getItem('name'); 
         console.log(this.username);
         this.mail = localStorage.getItem('mail'); 
         console.log(this.mail);       
         this.idUser = localStorage.getItem('id');
         console.log(this.idUser);
    
        }
  
        Update(name:any,email:any){
    let user ={name,email};
    console.log(user);
    this.myService.updateUser(this.idUser,user).subscribe();
    // Swal.fire('Done', 'Updated Successfully', 'success');
 }
 
}
