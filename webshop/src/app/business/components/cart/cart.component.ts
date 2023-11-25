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
    let isloggedIn = localStorage.getItem('isLoggedIn');
    if (isloggedIn == 'true') {
      this.router.navigate(['finalizeorder']);
    } else {
      this.router.navigate(['login']);
      this.messageService.add({
        severity: 'warn',
        summary: 'Figyelmeztetés',
        detail: 'Jelentkezz be a vásárláshoz!',
      });
    }
  }
}
