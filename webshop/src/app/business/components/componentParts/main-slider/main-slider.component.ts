import { Component } from '@angular/core';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent {
  products: { name: string; image: string; price: number; inventoryStatus: number; orderAmount: number }[] = [
    {
      name: "HDMI kábel 10 méteres",
      image: "https://www.beststore.hu/cache/1pcg59epntcswxfqqsv9qpsgk759unz64-63a0b91b387cc-53cd-1671477531.png",
      price: 1400,
      inventoryStatus: 10,
      orderAmount: 0
    },
    {
      name: "HP Pavilion Gaming Mouse",
      image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06172626.png",
      price: 6000,
      inventoryStatus: 20,
      orderAmount: 0
    },
    {
        name: "Bosch Mosogép",
        image: "https://s13emagst.akamaized.net/products/34679/34678375/images/res_07d3b46d5e9ac0a684774f5ce5f8c9df.jpg",
        price: 60000,
        inventoryStatus: 5,
        orderAmount: 0
      },
      {
        name: "Dyson hajszárító",
        image: "https://p1.akcdn.net/full/869587467.dyson-supersonic-hd07.jpg",
        price: 30000,
        inventoryStatus: 3,
        orderAmount: 0
      },
      {
        name: "Samsung mikró",
        image: "https://p1.akcdn.net/full/407846796.samsung-mg23k3515as.jpg",
        price: 20000,
        inventoryStatus: 300,
        orderAmount: 0
      },
      {
        name: "Dell Laptop",
        image: "https://notebookstore.hu/img/o/12995-k75k8.jpg",
        price: 123000,
        inventoryStatus: 50,
        orderAmount: 0
      }
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  totalQuantity: number = 0;

  updateTotalQuantity() {
    this.totalQuantity = this.products.reduce((total, product) => total + product.orderAmount, 0);
  }

  cartVisible: boolean = false;

  toggleCartVisibility() {
    this.cartVisible = !this.cartVisible;
  }

  selectedProduct: any = null; // Initialize selectedProduct as null
  cartItems: any[] = []; // Array to store cart items

  addToCart(product: any) {
    if (product.orderAmount < product.inventoryStatus) {
      if (this.selectedProduct !== product) {
        this.selectedProduct = product; // Set selectedProduct to the current product
      }
      product.orderAmount++; // Increment the orderAmount of the current product
      this.updateCartItems();
      this.cartVisible = true; // Show the cart when adding an item
    }
  }

  removeFromCart(product: any) {
    if (product.orderAmount > 0) {
      product.orderAmount--;
      this.selectedProduct = product; // Set selectedProduct when removing
      this.updateCartItems();
    }
  }

  resetSelectedProduct() {
    this.selectedProduct = null; // Reset selectedProduct
    this.updateCartItems();
  }

  updateCartItems() {
    this.cartItems = this.products.filter(product => product.orderAmount > 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.orderAmount * item.price, 0);
  }
}
