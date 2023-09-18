import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<{ name: string; price: number; orderAmount: number }[]>([]);
  cartUpdated$ = this.cartItemsSubject.asObservable();

  private readonly localStorageKey = 'cartItems';

  constructor() {
    this.loadCartItemsFromLocalStorage();
  }

  getCartItems(): { name: string; price: number; orderAmount: number }[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: { name: string; price: number }): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItem = currentCartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      existingItem.orderAmount++;
    } else {
      currentCartItems.push({
        name: item.name,
        price: item.price,
        orderAmount: 1
      });
    }

    this.updateCartAndLocalStorage(currentCartItems);
  }

  removeFromCart(item: { name: string; price: number }): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItem = currentCartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      existingItem.orderAmount--;

      if (existingItem.orderAmount === 0) {
        this.updateCartAndLocalStorage(currentCartItems.filter(cartItem => cartItem.name !== item.name));
      } else {
        this.updateCartAndLocalStorage(currentCartItems);
      }
    }
  }

  clearCart(): void {
    this.updateCartAndLocalStorage([]);
  }

  updateCartItemsArray(updatedCartItems: { name: string; price: number; orderAmount: number }[]): void {
    this.updateCartAndLocalStorage(updatedCartItems);
  }

  getTotalPrice(): number {
    const currentCartItems = this.cartItemsSubject.value;
    return currentCartItems.reduce((total, item) => total + item.orderAmount * item.price, 0);
  }

  private updateCartAndLocalStorage(cartItems: { name: string; price: number; orderAmount: number }[]): void {
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
