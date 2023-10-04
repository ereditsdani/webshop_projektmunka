import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartUpdated$ = this.cartItemsSubject.asObservable();

  private readonly localStorageKey = 'cartItems';

  constructor() {
    this.loadCartItemsFromLocalStorage();
  }

  getCartItems(): Product[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: Product): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItem = currentCartItems.find(
      (cartItem) => cartItem.productName === item.productName
    );

    if (existingItem) {
      existingItem.orderAmount++;
    } else {
      currentCartItems.push(item);
    }

    this.updateCartAndLocalStorage(currentCartItems);
  }

  removeFromCart(item: Product): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItem = currentCartItems.find(
      (cartItem) => cartItem.productName === item.productName
    );

    if (existingItem) {
      existingItem.orderAmount--;

      if (existingItem.orderAmount === 0) {
        this.updateCartAndLocalStorage(
          currentCartItems.filter(
            (cartItem) => cartItem.productName !== item.productName
          )
        );
      } else {
        this.updateCartAndLocalStorage(currentCartItems);
      }
    }
  }

  clearCart(): void {
    this.updateCartAndLocalStorage([]);
  }

  updateCartItemsArray(updatedCartItems: Product[]): void {
    this.updateCartAndLocalStorage(updatedCartItems);
  }

  getTotalPrice(): number {
    const currentCartItems = this.cartItemsSubject.value;
    return currentCartItems.reduce(
      (total, item) => total + item.orderAmount * item.price,
      0
    );
  }

  private updateCartAndLocalStorage(cartItems: Product[]): void {
    this.cartItemsSubject.next(cartItems);
    localStorage.setItem(this.localStorageKey, JSON.stringify(cartItems));
  }

  private loadCartItemsFromLocalStorage(): void {
    const storedCartItems = localStorage.getItem(this.localStorageKey);
    if (storedCartItems) {
      this.cartItemsSubject.next(JSON.parse(storedCartItems));
    }
  }
}
