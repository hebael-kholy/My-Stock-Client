import { Component, OnInit } from '@angular/core';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/Services/products/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  page: number = 1;
  totalRecords: number = 0;
  icon = faStar;
  iconCart = faCartShopping;
  products: any[] = [];
  enterSearchValue: string = '';
  enter: string = '';

  ChangeCase() {
    this.enterSearchValue = this.enter.toLocaleLowerCase();
    // console.log(this.enterSearchValue);
  }

  isLoading = false;

  constructor(public myService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.myService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      this.isLoading = false;
      this.products = data;
      this.totalRecords = data.length;
    });
  }
}
