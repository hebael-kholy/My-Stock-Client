import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  idUser :any;
  user:any;
  username ="";
  mail="";
  constructor(myActivated:ActivatedRoute,public myService:UserService){
     this.idUser = myActivated.snapshot.params["_id"];
    console.log(this.idUser);
  }
  ngOnInit(): void {
    this.myService.getOneUser(this.idUser).subscribe(
      { next:(res)=>{
        console.log(res);
        this.user = res;
        this.username =this.user.username;
       this.mail = this.user.email;
      },
      error:(err)=>{console.log(err)}
    }
    )
  }
  Update(username:any,email:any){
    let user ={username,email};
    this.myService.updateUser(this.idUser,user).subscribe();
    // alert("student Updated");
 }
}
