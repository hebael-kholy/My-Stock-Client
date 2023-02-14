import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from 'src/app/Components/product-details/product-details.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public myClient: HttpClient) {}

  getSalesProducts() {
    return this.myClient.get(
      'https://ecommerceiti-heba.onrender.com/product/products/sale'
    );
  }

  getAllProducts() {
    return this.myClient.get('https://ecommerceiti-heba.onrender.com/product/');
  }

  getProductDetails(id: any) {
    return this.myClient.get(
      `https://ecommerceiti-heba.onrender.com/product/${id}`
    );
  }

  addtocart(id: any, data: CartItem) {
    return this.myClient.post(
      `https://ecommerceiti-heba.onrender.com/cart/${id}`,
      data
    );
  }
}
