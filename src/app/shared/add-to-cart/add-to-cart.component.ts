import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() inputProduct: Product;
  constructor(public productService: ProductService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  openDialog(template: TemplateRef<any>): any {
    this.dialog.open(template);
  }

  hideDialog(): any {
    this.dialog.closeAll();
  }
  openSnackBar(message: string, action: string): any {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
