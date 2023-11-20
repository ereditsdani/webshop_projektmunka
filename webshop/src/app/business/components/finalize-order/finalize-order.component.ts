import { Component } from '@angular/core';
import { Product } from '../../Models/Product';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.scss'],
})
export class FinalizeOrderComponent {
  successfullOrder: boolean = false;
  cartItems: Product[] = [];
  paymentMethodOptions: any[] = [
    { label: 'Utánvét', value: 'off' },
    { label: 'Bankkártya', value: 'on' },
  ];
  shippingMethodOptions: any[] = [
    { label: 'Csomagpont átvétel', value: 'off' },
    { label: 'Házhoz szállítás', value: 'on' },
  ];
  shippingMethod: string = 'off';
  paymentMethod: string = 'off';
  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartService.cartUpdated$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
    this.successfullOrder = false;
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  orderItems() {
    if (this.cartItems.length > 0) {
      this.orderService.saveOrder(this.cartItems);
      this.clearCart();
      this.messageService.add({
        severity: 'success',
        summary: 'Info',
        detail: 'Sikeres megrendelés!',
      });
      this.successfullOrder = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Hiba',
        detail: 'Üres a kosarad!',
      });
    }
  }
}
