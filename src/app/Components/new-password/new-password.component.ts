import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private services: LoginService, private router: Router){}
  form!:FormGroup;
  ngOnInit(): void {
     this.form = this.fb.group({
      password:['', Validators.required],
      newpassword: ['', Validators.required],
     },
     );
  }
  // user = localStorage.getItem('email');
  // useremail = this.user && JSON.parse(this.user).email;
  resetForm: any = {
    email: localStorage.getItem(JSON.parse('email')),
    newpassword: '',
  };


  onSubmit(){
    console.log(this.resetForm);
    this.services.changePassword({email:'hellanaasaad@gmail.com',
    newpassword:"lilo123"}).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/login']);
    },err=>{console.log(err); Swal.fire("email wrong","","error")})
  }
}


