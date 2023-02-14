import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  icon = faShoppingCart;
  icon2 = faHeart;

  username: any;
  image: any;

  constructor(
    public authService: LoginService,
    public userService: UserService
  ) {}
  ngAfterViewChecked(): void {
    this.image = localStorage.getItem('image');
    this.username = localStorage.getItem('name');
  }
  ngOnInit(): void {}

  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }
}
