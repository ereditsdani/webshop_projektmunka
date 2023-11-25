import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../Models/Order';
import { OrderService } from '../../services/order.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
})
export class ManageOrdersComponent {
  orders$: Observable<Order[]> = new Observable<Order[]>();
  orders: Order[] = [];
  selectedOrders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.orderService.getOrdersFromDb();

    this.orders$ = this.orderService.orders$;
    this.orderService.orders$.subscribe((x) => {
      this.orders = x;
    });
  }

  deleteSelectedOrders() {
    this.orderService.deleteOrder(this.selectedOrders);
    this.selectedOrders = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Rendelés(ek) törölve!',
    });
  }
}
