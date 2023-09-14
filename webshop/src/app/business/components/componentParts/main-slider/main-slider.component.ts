import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit {
  


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


  cartItems: { name: string; price: number; orderAmount: number }[] = [];

  hasLocalStorageData: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Load cart items from local storage when the component is initialized
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
  
      // Update the orderAmount for each product based on cartItems
      this.products.forEach(product => {
        const cartItem = this.cartItems.find(item => item.name === product.name);
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
  }
  


  

  
  totalQuantity: number = 0;

  updateTotalQuantity() {
    this.totalQuantity = this.products.reduce((total, product) => total + product.orderAmount, 0);
  }

  cartVisible: boolean = false;

  toggleCartVisibility() {
    this.cartVisible = !this.cartVisible;

    // When toggling cart visibility, update cart items and save to local storage
    this.updateCartItems();
  }


  selectedProduct: any = null; // Initialize selectedProduct as null
  

  addToCart(product: any) {
    if (product.orderAmount < product.inventoryStatus) {
      if (this.selectedProduct !== product) {
        this.selectedProduct = product;
      }
      product.orderAmount++;
  
      // Check if the product is already in the cart
      const existingItem = this.cartItems.find(item => item.name === product.name);
  
      if (existingItem) {
        existingItem.orderAmount++; // Increment the orderAmount if already in cart
      } else {
        // Add a new item if not in cart
        this.cartItems.push({
          name: product.name,
          price: product.price,
          orderAmount: 1
        });
      }
  
      // Update cart items and save to local storage
      this.updateCartItems();
      this.cartVisible = true;
    }
  }
  
  removeFromCart(product: any) {
    if (product.orderAmount > 0) {
      product.orderAmount--;
  
      // Find the matching item in cartItems
      const existingItem = this.cartItems.find(item => item.name === product.name);
  
      if (existingItem) {
        existingItem.orderAmount--; // Decrement the orderAmount
        if (existingItem.orderAmount === 0) {
          // Remove the item if orderAmount is 0
          const index = this.cartItems.indexOf(existingItem);
          this.cartItems.splice(index, 1);
        }
  
        // Update cart items and save to local storage
        this.updateCartItems();
      }
    }
  }
  
  clearCart() {
    // Reset orderAmount for each product and clear the cartItems array
    this.products.forEach(product => {
      product.orderAmount = 0;
    });
    this.cartItems = [];
  
    // Save the updated cart items to localStorage
    this.updateCartItems();
  
    // Hide the cart
    this.cartVisible = false;
  }
  

  resetSelectedProduct() {
    this.selectedProduct = null; // Reset selectedProduct
    this.updateCartItems();
  }

  updateCartItems() {
    // Filter products with non-zero orderAmount to update cartItems
    this.cartItems = this.products
      .filter(product => product.orderAmount > 0)
      .map(product => ({
        name: product.name,
        price: product.price,
        orderAmount: product.orderAmount
      }));
  
    // Save the cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.orderAmount * item.price, 0);
  }
}
