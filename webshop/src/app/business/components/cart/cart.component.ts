import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  cartItems: { name: string; price: number; orderAmount: number }[] = [];

  constructor(private cartService: CartService, private messageService: MessageService) {}

  
  ngOnInit() {
    this.cartService.cartUpdated$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  removeOneFromCart(item: any) {
    this.cartService.removeFromCart({
      name: item.name,
      price: item.price,
    });
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  orderItems() {
    //Ezt még ki kell fejteni, egyelőre csak kitörli a dolgokat kattintásra
    this.clearCart();

    // Optionally, you can display a success message or navigate to a confirmation page
  }


 
}
