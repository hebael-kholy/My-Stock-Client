import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  constructor(private fb: FormBuilder, private services: LoginService, private router: Router){}
  form!:FormGroup;
  ngOnInit(): void {
     this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ],
      ],
     })
  }

  resetForm: any = {
    email: '',
  };

  onSubmit(){
    this.services.resetPassword(this.resetForm).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/verifyCode']);
    },err=>{console.log(err); Swal.fire("email wrong","","error")})
  }
}
