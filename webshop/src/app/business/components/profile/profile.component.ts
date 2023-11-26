import { Component } from '@angular/core';
import { User } from '../../Models/User';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Order } from '../../Models/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  loggedInUserDTO?: User;
  email: any;
  phoneNumber: any;
  address: any;
  orders$: Observable<Order[]> = new Observable<Order[]>();
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      this.loggedInUserDTO = JSON.parse(JSON.parse(loggedInUserString));
    }
    this.email = this.loggedInUserDTO!.email;
    this.phoneNumber = this.loggedInUserDTO!.phoneNumber;
    this.address =
      this.loggedInUserDTO!.postalNumber + ' ' + this.loggedInUserDTO!.address;

    this.orderService.getOrdersFromDb();

    this.orders$ = this.orderService.orders$;
    this.orderService.orders$.subscribe((x) => {
      this.orders = x;
      this.filteredOrders = this.orders.filter(
        (x) => x.user?.id == this.loggedInUserDTO?.id
      );
    });
  }
  isSummaryVisible(orderItem: any, orderItems: any) {
    if (orderItems[orderItems.length - 1] == orderItem) {
      return true;
    }
    return false;
  }

  getSummaryPrice(orderItems: any) {
    let total = 0;
    orderItems.forEach((element: any) => {
      total += element.product.price * element.quantity;
    });
    return total;
  }
}
