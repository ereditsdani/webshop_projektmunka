import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

 constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartUpdated$.subscribe(cartItems => {
      this.cartItemCount = cartItems.reduce((count, item) => count + item.orderAmount, 0);
    });
  }
}
