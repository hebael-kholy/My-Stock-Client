import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';

export class User {
  name!: string ;
  password!: string ;
  email!: string;
  gender!: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  errormsg:any;
  successmsg: any;
  user: User = new User();
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiservice: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      email: ['',[Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['',[Validators.required,Validators.minLength(3)]],
      gender: ['',Validators.required]
    });

  }

  get username() {
    // return this.userForm.get('name');
    return this.userForm.controls['name'].valid;
  }


  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  isLoading = false;
  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    if(this.userForm.valid){
      this.isLoading = true;
      this.apiservice.createUser(this.userForm.value).subscribe((res)=>{
        console.log(res, 'data submitted');
        this.userForm.reset();
        this.successmsg = res.message;
        Swal.fire('Thank You...', 'You Sumitted Successfully', 'success');
        this.isLoading = false;
        this.router.navigateByUrl('/login');
      })
    } else {
      this.errormsg ="All field required.";
    }
  }

  visible:boolean = true;
  changetype:boolean =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

}



