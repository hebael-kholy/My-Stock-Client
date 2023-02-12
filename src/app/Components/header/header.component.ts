import { Component } from '@angular/core';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  icon = faShoppingCart;
  icon2 = faHeart;

  constructor(public authService: LoginService) {}

  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }
}
