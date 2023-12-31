import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Models/Order';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public orders$: Observable<Order[]> = new Observable<Order[]>();
  private _orders: BehaviorSubject<Order[]>;

  private dataStore: {
    orders: Order[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { orders: [] };
    this._orders = new BehaviorSubject([]) as unknown as BehaviorSubject<
      Order[]
    >;
    this.orders$ = this._orders.asObservable();
  }

  saveOrder(order: any, userId: any, shippingMethod: any, paymentMethod: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {
        userId: userId,
        shippingMethod: shippingMethod,
        paymentMethod: paymentMethod,
      },
    };
    const formData = new FormData();
    formData.append('orderJson', JSON.stringify(order));
    console.log(formData.get('orderJson'));
    return this.http
      .post('https://localhost:7054/api/Order/SaveOrder', formData, options)
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }

  deleteOrder(orders: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('orderJson', JSON.stringify(orders));
    console.log(formData.get('orderJson'));

    return this.http
      .post('https://localhost:7054/api/Order/DeleteOrder', formData, options)
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getOrdersFromDb();
        },
      });
  }

  getOrdersFromDb() {
    const options = { withCredentials: true };
    this.http
      .get<Order[]>('https://localhost:7054/api/Order/GetOrders', options)
      .subscribe({
        next: (result: Order[]) => {
          this.dataStore.orders = result;
          this._orders.next(Object.assign({}, this.dataStore).orders);
          console.log(this.orders$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }
}
