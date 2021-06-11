import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  cartItem: CartItem;
  modalRef: BsModalRef;
  dataSource: MatTableDataSource<Product[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    'Number',
    'Name',
    'Price',
    'Quantity',
    'Actions'
  ];
  createPaymentDto: FormGroup;
  createOrderDto: FormGroup;
  selectedPM = '';
  paymentMethods: string[] = [
    'VISA',
    'PAYPAL',
    'CASH_ON_DELIVERY',
    'MASTERCARD'
  ];

  constructor(private cartService: CartService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private modalService: BsModalService,
              private snackBar: MatSnackBar,
              private productService: ProductService,
              private dialog: MatDialog) {
              this.prepareCartData();
  }

  // tslint:disable-next-line:typedef
  get paymentMethod() {
    return this.createPaymentDto.get('payment_method');
  }

  // tslint:disable-next-line:typedef
  get comments() {
    return this.createOrderDto.get('comments');
  }

  ngOnInit(): void {
    this.prepareCartData();
    this.createPaymentDto = this.fb.group({
      payment_method: new FormControl(null, Validators.required)
    });
    this.createOrderDto = this.fb.group({
      comments: new FormControl(null, Validators.required)
    });
  }

  prepareCartData(): any {
    if (this.authService.cart && this.authService.cartItem) {
      this.cart = this.authService.cart;
      this.cartItem = this.authService.cartItem;
      this.dataSource = new MatTableDataSource<any>(this.cartItem.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.log(false);
    }
  }

  refreshCartData(): any {
    this.cartService.getCartItem(this.authService.cartItem.id)
      .subscribe(res => {
        this.cartItem = res;
        this.authService.cartItem = res;
        this.dataSource = new MatTableDataSource<any>(res.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar('Cart Refreshed Successfully', 'OK');
      });
  }

  clearCartProducts(): any {
    this.cartService.clearCartProducts(this.cartItem.id)
      .subscribe(res => {
        this.cartItem = res;
        this.openSnackBar('Cart cleared successfully!', 'OK');
      });
  }

  openDialog(template: TemplateRef<any>): any {
    this.dialog.open(template);
  }

  hideDialog(): any {
    this.dialog.closeAll();
  }

  openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(template);
  }

  hideModal(): any {
    this.modalRef.hide();
  }

  openSnackBar(message: string, action: string): any {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  checkSelectedMethod(): any {
    return this.selectedPM === 'PAYPAL' || this.selectedPM === 'VISA'
      || this.selectedPM === 'MASTERCARD' || this.selectedPM === 'CASH_ON_DELIVERY';
  }

  removeFromCart(productId: number): any {
    this.cartService.removeFromCart(this.cartItem.id, productId)
      .subscribe(res => {
        this.cartItem = res;
        this.openSnackBar('product removed successfully', 'OK');
      }, (error: Error) => {
        this.openSnackBar(`An error has occurred ${error.message}`, 'OK');
      });
  }

  completeCheckout(): any {
    const checkoutData = {
      createPaymentDto: this.createPaymentDto.value,
      createOrderDto: this.createOrderDto.value
    };
    this.cartService.checkout(this.cartItem.id, checkoutData)
      .subscribe(res => {
        this.openSnackBar('order created successfully', 'OK');
        this.router.navigate(['/orders'], {
          queryParams: {
            NewOrder: true
          }
        });
      },
        (error: Error) => {
          this.openSnackBar(`An error has occurred ${error.message}`, 'OK');
        });

  }

  updateProductCartQuantity(product: Product): any {
    this.productService.updateProductCartQuantity(product.id, product.cartQuantity)
      .subscribe(res => {
        this.openSnackBar(`Quantity of this products was updated successfully!`, 'OK');

      });
  }

}
