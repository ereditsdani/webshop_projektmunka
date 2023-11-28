import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';

import { Message, MessageService } from 'primeng/api';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from 'src/app/business/services/cart.service';
import { ProductService } from 'src/app/business/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/business/Models/Product';
import { OrderService } from 'src/app/business/services/order.service';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],

  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MainSliderComponent implements OnInit {
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private messageService: MessageService,
    public productService: ProductService
  ) {}

  cartItems: { name: string; price: number; orderAmount: number }[] = [];
  totalQuantity: number = 0;
  cartVisible: boolean = false;
  messages: Message[] = [];
  products$: Observable<Product[]> = new Observable<Product[]>();
  products: Product[] = [];
  cartUpdated: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.products$ = this.productService.product$;
    this.productService.product$.subscribe((x) => {
      this.products = x;
    });
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);

      this.products.forEach((product) => {
        const cartItem = this.cartItems.find(
          (item) => item.name === product.productName
        );
        if (cartItem) {
          product.orderAmount = cartItem.orderAmount;
        }
      });

      console.log('Cart Items Loaded:', this.cartItems);

      this.cartVisible = true;

      this.cdr.detectChanges();
    } else {
      console.log('No Cart Items Found in localStorage');
    }
  }

  toggleCartVisibility() {
    this.cartVisible = !this.cartVisible;

    // When toggling cart visibility, update cart items and save to local storage
    this.updateCart();
  }

  addToCart(product: Product) {
    if (product.orderAmount === undefined) {
      product.orderAmount = 0;
    }
    if (product.quantity > 0) {
      product.orderAmount++;
      const foundItem = this.products.find((item) => item.id === product.id);

      if (foundItem) {
        // Ensure the quantity doesn't go below zero
        foundItem.quantity = Math.max(0, foundItem.quantity - 1);
      }
      this.cartService.addToCart(product);

      this.displayMessage(
        'success',
        'Hozzáadva a kosárhoz!',
        `Hozzáadtál 1x ${product.productName} elemet a kosárhoz!`
      );

      // Manually trigger change detection
      this.triggerChangeDetection();
    }
  }

  removeFromCart(item: any) {
    if (item.orderAmount > 0) {
      item.orderAmount--;
      this.cartService.removeFromCart(item);
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.products.forEach((product) => (product.orderAmount = 0));
  }

  resetSelectedProduct() {
    this.updateCart();
  }

  private updateCart() {
    const updatedCartItems = this.products.filter(
      (product) => product.orderAmount > 0
    );

    this.cartService.updateCartItemsArray(updatedCartItems);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.orderAmount * item.price,
      0
    );
  }

  displayMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
  triggerChangeDetection() {
    this.cdr.detectChanges();
  }
}
