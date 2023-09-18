import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';

import { Message, MessageService } from 'primeng/api';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from 'src/app/business/services/cart.service';

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
  products: {
    name: string;
    image: string;
    price: number;
    inventoryStatus: number;
    orderAmount: number;
  }[] = [
    {
      name: 'HDMI kábel 10 méteres',
      image:
        'https://www.beststore.hu/cache/1pcg59epntcswxfqqsv9qpsgk759unz64-63a0b91b387cc-53cd-1671477531.png',
      price: 1400,
      inventoryStatus: 10,
      orderAmount: 0,
    },
    {
      name: 'HP Pavilion Gaming Mouse',
      image:
        'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06172626.png',
      price: 6000,
      inventoryStatus: 20,
      orderAmount: 0,
    },
    {
      name: 'Bosch Mosogép',
      image:
        'https://s13emagst.akamaized.net/products/34679/34678375/images/res_07d3b46d5e9ac0a684774f5ce5f8c9df.jpg',
      price: 60000,
      inventoryStatus: 5,
      orderAmount: 0,
    },
    {
      name: 'Dyson hajszárító',
      image: 'https://p1.akcdn.net/full/869587467.dyson-supersonic-hd07.jpg',
      price: 30000,
      inventoryStatus: 3,
      orderAmount: 0,
    },
    {
      name: 'Samsung mikró',
      image: 'https://p1.akcdn.net/full/407846796.samsung-mg23k3515as.jpg',
      price: 20000,
      inventoryStatus: 300,
      orderAmount: 0,
    },
    {
      name: 'Dell Laptop',
      image: 'https://notebookstore.hu/img/o/12995-k75k8.jpg',
      price: 123000,
      inventoryStatus: 50,
      orderAmount: 0,
    },
  ];

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
    private messageService: MessageService
  ) {}

  cartItems: { name: string; price: number; orderAmount: number }[] = [];
  totalQuantity: number = 0;
  cartVisible: boolean = false;
  messages: Message[] = [];

  cartUpdated: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);

      // Update the orderAmount for each product based on cartItems
      this.products.forEach((product) => {
        const cartItem = this.cartItems.find(
          (item) => item.name === product.name
        );
        if (cartItem) {
          product.orderAmount = cartItem.orderAmount;
        }
      });

      console.log('Cart Items Loaded:', this.cartItems);

      // Set cartVisible to true when there is data in localStorage
      this.cartVisible = true;

      // Trigger change detection to update the view
      this.cdr.detectChanges();
    } else {
      console.log('No Cart Items Found in localStorage');
    }

    this.updateTotalQuantity();
  }

  updateTotalQuantity() {
    this.totalQuantity = this.products.reduce(
      (total, product) => total + product.orderAmount,
      0
    );
  }

  toggleCartVisibility() {
    this.cartVisible = !this.cartVisible;

    // When toggling cart visibility, update cart items and save to local storage
    this.updateCart();
  }

  addToCart(product: any) {
    if (product.orderAmount < product.inventoryStatus) {
      product.orderAmount++;
      this.cartService.addToCart({
        name: product.name,
        price: product.price,
      });
      this.updateTotalQuantity();

      this.displayMessage(
        'success',
        'Hozzáadva a kosárhoz!',
        `Hozzáadtál 1x ${product.name} elemet a kosárhoz!`
      );

      // Manually trigger change detection
      this.triggerChangeDetection();
    }
  }

  removeFromCart(item: any) {
    if (item.orderAmount > 0) {
      item.orderAmount--;
      this.cartService.removeFromCart({
        name: item.name,
        price: item.price,
      });
      this.updateTotalQuantity();
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.products.forEach((product) => (product.orderAmount = 0));
    this.updateTotalQuantity();
  }

  resetSelectedProduct() {
    this.updateCart();
  }

  private updateCart() {
    const updatedCartItems = this.products
      .filter((product) => product.orderAmount > 0)
      .map((product) => ({
        name: product.name,
        price: product.price,
        orderAmount: product.orderAmount,
      }));

    this.cartService.updateCartItemsArray(updatedCartItems);
    this.updateTotalQuantity();
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
