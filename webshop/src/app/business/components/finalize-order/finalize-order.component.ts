import { Component } from '@angular/core';
import { Product } from '../../Models/Product';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../Models/User';

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
  loggedInUserDTO?: User;
  email: any;
  phoneNumber: any;
  address: any;

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

    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      this.loggedInUserDTO = JSON.parse(JSON.parse(loggedInUserString));
    }
    this.email = this.loggedInUserDTO!.email;
    this.phoneNumber = this.loggedInUserDTO!.phoneNumber;
    this.address =
      this.loggedInUserDTO!.postalNumber + ' ' + this.loggedInUserDTO!.address;
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  orderItems() {
    if (this.cartItems.length > 0) {
      let shippingMethod;
      let paymentMethod;
      if (this.shippingMethod == 'off') {
        shippingMethod = 'Csomagpont átvétel';
      } else {
        shippingMethod = 'Házhoz szállítás';
      }
      if (this.paymentMethod == 'off') {
        paymentMethod = 'Utánvét';
      } else {
        paymentMethod = 'Bankkártya';
      }
      this.orderService.saveOrder(
        this.cartItems,
        this.loggedInUserDTO?.id,
        shippingMethod,
        paymentMethod
      );
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
