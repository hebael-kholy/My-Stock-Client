import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCartShopping, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/Services/products/products.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';


export class CartItem{

  product!:number;
  color!:string;

    
}
export class WihlistItem{

  productId!:number;
    
}



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})

export class ProductDetailsComponent implements OnInit {
  ID = 0;
  product: any;
  icon = faStar;
  iconCart = faCartShopping;
  cart:any[]=[];
  categoryId:any;
  icon2 = faHeart;
  addedtowishlist : boolean = false;
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user)._id;


  constructor(public route: ActivatedRoute, public myService: ProductsService, public wishlistService : WishlistService) {
    this.ID = route.snapshot.params['id'];
    console.log(this.ID);
  }

  ngOnInit(): void {
    this.myService.getProductDetails(this.ID).subscribe({
      next: (res) => {
        console.log(this.ID);
        console.log(res);
        this.product = res;
        this.categoryId = this.product.data.category._id;
        console.log(this.categoryId)
        
      },
      error(err) {
        console.log(err);
      },
    });

  }
  add(){
    console.log(this.product);
    console.log("user is logged in");

    console.log(`this is userid ${this.userId}`)
    console.log(this.ID)
    let cartitem : CartItem ={
      
      product:this.ID,
      color:'purple',     
    }
    console.log(typeof(cartitem))
    console.log(cartitem) 
    this.myService.addtocart(this.userId,cartitem).subscribe();
  

  }

  AddToWishlist(){
 
    console.log(this.product);

    console.log(`this is userid ${this.userId}`)
    console.log(this.ID)
    let wishlistitem : WihlistItem ={     
      productId:this.ID,     
    }
    console.log(typeof(wishlistitem))
    console.log(wishlistitem)     
    this.myService.addtoWishlist(this.userId,wishlistitem).subscribe((res)=>{
      console.log(res);
      this.addedtowishlist = true
    });
  }


}



