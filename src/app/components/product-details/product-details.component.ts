import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public authService: AuthService,
              public productService: ProductService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('productId')) {
        this.productService.getProductById(+params.get('productId'))
          .subscribe(resProduct => {
            this.product = resProduct;
          });
      }
    });
  }

  ngOnInit(): void {
  }

  openDialog(template: TemplateRef<any>): any {
    this.dialog.open(template);
  }

  openSnackBar(message: string, action: string): any {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  hideDialog(): any {
    this.dialog.closeAll();
  }

}
