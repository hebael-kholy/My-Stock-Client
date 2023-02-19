import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { CartItem, ProductDetailsComponent } from '../product-details/product-details.component';


export class Order{

  shippingPrice!:number;
  taxPrice!:number
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  items: any[] = [];
  product:any;
  productId: number = 0;
  totalPrice : number = 0;
  itemId:any;
  productTitle:any;
  data2:any;
  value:any;
  cartId:any;

 user = localStorage.getItem('user');
 userId = this.user && JSON.parse(this.user)._id;


  constructor(public route: ActivatedRoute, public myService: CartService){
  }
  ngOnInit(): void {
    this.myService.getCartitems(this.userId).subscribe((res: any) => {
          console.log(res);      
          this.data2 = res.data; 
          this.items = res.data.cartItems;
          console.log(this.items); 
          this.cartId = res.data._id;
          console.log(`this is cart id ${this.cartId}`)
          this.totalPrice = res.data.totalCarPrice; 
          console.log(this.totalPrice)

            })
        
          }  

getCartTotal(){  

  this.myService.getCartitems(this.userId).subscribe((res: any) => {
    console.log(res);      
    this.totalPrice = res.data.totalCarPrice;

})
}

  
removeitem(item :any){

  this.itemId= item._id;
  console.log(`this id for item ${this.itemId}`);
  console.log(`this id for user ${this.userId}`);
  this.myService.removeitemfromcart(this.userId,this.itemId).subscribe((res)=>{
    this.items.splice(this.items.indexOf(item),1)
    this.totalPrice = this.data2.totalCarPrice;
    this.getCartTotal()
  });

  }

  clearcart(){
     

  console.log(`this id for user ${this.userId}`);
  this.myService.clearCart(this.userId).subscribe((res)=>{
    console.log(res);
    this.items = [];
  });

  }

  updateItemQuantity(item:any){

    this.itemId= item._id;
    let updateditem : any ={
      quantity : this.value
    }
    this.value = item.quantity;
    console.log(`this id for item ${this.itemId}`);
    console.log(`this id for user ${this.userId}`);
    this.myService.UpdateQuantity(this.userId,this.itemId,updateditem).subscribe((res)=>{
      console.log(res);
      this.getCartTotal()
      
      

    })
  }

  AddOrder(){

    console.log(`this is userid ${this.userId}`)
  
    let order: Order ={
      
      shippingPrice:10,
      taxPrice:10
    }
    console.log(typeof(order))
    console.log(order);
    
    
    this.myService.createOrder(this.userId,this.cartId,order).subscribe((res)=>{
      console.log(res);
    });
  }

  }


