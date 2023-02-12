import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/Services/products/products.service';

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

  constructor(public route: ActivatedRoute, public myService: ProductsService) {
    this.ID = route.snapshot.params['id'];
    console.log(this.ID);
  }

  ngOnInit(): void {
    this.myService.getProductDetails(this.ID).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
