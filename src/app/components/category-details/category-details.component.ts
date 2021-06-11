import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              private productService: ProductService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.categoryService.getCategoryById(+params.get('id'))
          .subscribe(res => {
            this.category = res;
          });
      } else {
        router.navigate(['/categories']);
      }
    });
  }

  ngOnInit(): void {
  }

  viewProductDetails(product: Product): any {
    this.productService.viewProductDetails(product);
  }

}
