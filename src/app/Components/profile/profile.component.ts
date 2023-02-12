import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  idUser: any;
  user: any;
  username: any;
  mail: any;
  token: any;
  image: any;
  isEditName = false;
  isEditMail = false;

  form = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  @Output() formEvent = new EventEmitter();

  get NameValid() {
    return this.form.controls['username'].valid;
  }
  get mailValid() {
    return this.form.controls['email'].valid;
  }
  nameError = 'name is required';
  mailError = 'mail is required';

  constructor(myActivated: ActivatedRoute, public myService: UserService) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    console.log(this.token);
    this.username = localStorage.getItem('name');
    console.log(this.username);
    this.mail = localStorage.getItem('mail');
    console.log(this.mail);
    this.idUser = localStorage.getItem('id');
    console.log(this.idUser);
    this.image = localStorage.getItem('image');
    console.log(this.image);
  }
  EditName(item: any) {
    this.isEditMail = false;
    this.isEditName = true;
  }
  EditMail(item: any) {
    this.isEditMail = true;
    this.isEditName = false;
  }

  Update(name: any, email: any) {
    let user = { name, email };
    console.log(user);
    if (this.form.status === 'VALID') {
      this.formEvent.emit(this.form.value);
      this.myService.updateUser(this.idUser, user).subscribe();
      Swal.fire('Done', 'Updated Successfully', 'success');
      setTimeout(() => {
        location.reload();
      }, 1500);
      localStorage.setItem('mail', user.email);
      localStorage.setItem('name', user.name);
      this.isEditName = false;
      this.isEditMail = false;
    } else {
      this.nameError = 'name is required';
      this.mailError = ' pattern must be email@example.com';
    }
  }
}
