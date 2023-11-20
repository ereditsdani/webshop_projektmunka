import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { Product } from '../../Models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartUpdated$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  removeOneFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  orderItems() {
    this.router.navigate(['finalizeorder']);
    // this.orderService.saveOrder(this.cartItems);
    // this.clearCart();
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Info',
    //   detail: 'Sikeres megrendelés!',
    // });
  }
}
