import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[];

  constructor(public authService: AuthService, public productService: ProductService) {
    this.authService.refreshInfo();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  sortProductsByDate(): Product[] {
    if (this.products) {
      return this.products.sort((a, b) => {
        // return <any>new Date(b.publishedIn) - <any>new Date(a.publishedIn);
        return (new Date(b.publishedIn) as any) - (new Date(a.publishedIn) as any);
      });
    }
  }

}
