
import { Component, OnChanges, OnInit, AfterViewChecked} from '@angular/core';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/auth/auth.service';
import { CartService } from 'src/app/Services/cart/cart.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';
import { UserService } from 'src/app/Services/user.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit{

  icon = faShoppingCart;
  icon2 = faHeart;
  items:any;
  items2:any;
  totalitems:number = 0;
  totalitems2:number = 0;

  // constructor(public authService: LoginService ) {}
  constructor(public cartService : CartService, public authService: LoginService , public wishlistService : WishlistService){}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)._id;
    this.cartService.getCartitems(userId)
    .subscribe((res)=>{
      this.items = res;
      this.totalitems = this.items.numOfItem;
    })
    this.wishlistService.getWishlistitems(userId)
    .subscribe((res)=>{
      this.items2 = res;
      this.totalitems2 = this.items2.count;
      

    })
    
  }
  


 

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
