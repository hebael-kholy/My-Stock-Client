import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit{
  constructor(private fb: FormBuilder, private services: LoginService, private router: Router){}

  // move(event: any){

  // }
  @ViewChildren('ngOtpInput') ngOtpInput: any;
  title = 'otp-app';

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between',
    // allowNumbersOnly:true,
  }

  ngOnInit() {
    this.onOtpChange(event);
    this.verify();
    // this.setVal(val);
  }

  onOtpChange(event: any) {
    this.otp = event;
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if(this.otp.length == this.configOptions.length) {
      this.inputDigitLeft = "Let's go!";
      this.btnStatus = 'btn-primary';
    }
    console.log(event);


  }
  // setVal(val: any) {
  //   this.ngOtpInput.setValue(val);
  // }
  verify(){
   console.log(this.ngOtpInput.setValue);
  //  const s = this.ngOtpInput.setValue(event);
  //  console.log(s);

    this.services.veryfyCode(this.ngOtpInput.value).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/']);
    },err=>{console.log(err); Swal.fire("email wrong","","error")})
  }
  // setVal(val) {
  //   this.ngOtpInput.setValue(val);
  // }
}
