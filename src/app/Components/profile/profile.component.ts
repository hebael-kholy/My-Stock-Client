import { Component, OnInit,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  gender :any;
  isEditName = false;
  isEditMail = false;
  isEditGender  = false;
  File:any;
  imgText = "Select Image";
  isLoading = false;

  form = new FormGroup({
    username: new FormControl("",[Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required ,Validators.email])
  })
 
  @Output() formEvent = new EventEmitter();
  
  get NameValid(){
    return this.form.controls["username"].valid;
   }
   get mailValid(){
    return this.form.controls["email"].valid;
   }
   nameError ="name is required";
   mailError ="mail is required";

  constructor(myActivated:ActivatedRoute,public myService:UserService){ }
  ngOnInit(): void {
     //set values in local storage
         this.token= localStorage.getItem('token'); 
         console.log(this.token);
         this.username = localStorage.getItem('name'); 
         console.log(this.username);
         this.mail = localStorage.getItem('mail'); 
         console.log(this.mail);       
         this.idUser = localStorage.getItem('id');
         console.log(this.idUser);
         this.imagePath = localStorage.getItem('image');
         console.log(this.imagePath);
         this.gender = localStorage.getItem('gender');
     
         //get all users
         this.myService.getOneUser(this.idUser).subscribe({
          next: (res) => {
            this.user = res;
            console.log(this.user);
            console.log(this.user.data.name);
            // console.log(this.user.data[0].gender);
          },
          error(err) {
            console.log(err);
          }
        });
// end ngOnIt
        }
        // switch inputs display editing
        EditName(item:any){
          this.isEditName = true;
          this.isEditMail = false;
          this.isEditGender  = false;
        }
        EditMail(item:any){
          this.isEditMail = true;
          this.isEditName = false;
          this.isEditGender  = false;
        }
        EditGender(){
          this.isEditGender  = true;
          this.isEditMail = false;
          this.isEditName = false;
        }

        // drop down box to select
        onSelected(value:string): void {
          this.gender = value;
          console.log(this.gender);
        }

      // change  profile pic
    handleFileInput(event:any) {
      this.File = event.target.files[0];
      console.log(this.File);
      this.imgText = this.File.name;
  }
    Upload(){
      const formData = new FormData();
       formData.append("image", this.File);
       console.log(formData);
       this.isLoading = true
      this.myService.updateUserImage(this.idUser,formData).subscribe((res:any)=>{
        console.log(res);
        this.imagePath = res.user.image;
        this.isLoading = false;
      },err=>{
        Swal.fire('Sorry....', 'please select img to change', 'error');
      });
      // console.log(this.idUser);
      // if(this.File){
      //   console.log(this.imagePath);
      //   this.imagePath = this.user.data.image;
      //   console.log(this.imagePath);

      //   // Swal.fire('Done', 'Updated picture', 'success');
      // }else{
      //   Swal.fire('Sorry....', 'please select img to change', 'error');
      // }
      console.log(this.imagePath);

    }
    //  this.myService.updateUserImage(this.idUser,user).subscribe();

        // update user
       Update(name:any,email:any, gender:any){          
    let user ={name,email,gender};
    console.log(user);
    if(this.form.status ==="VALID"){
      this.formEvent.emit(this.form.value);
    }else{
      this.nameError = "name is required";
      this.mailError =" pattern must be email@example.com" 
    }
    this.myService.updateUser(this.idUser,user).subscribe();
    Swal.fire('Done', 'Updated Successfully', 'success');
 }
}