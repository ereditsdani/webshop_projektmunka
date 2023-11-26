import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/business/services/cart.service';
import { UserService } from 'src/app/business/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  storedData: any;

  constructor(
    private cartService: CartService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.cartService.cartUpdated$.subscribe((cartItems) => {
      this.cartItemCount = cartItems.reduce(
        (count, item) => count + item.orderAmount,
        0
      );
    });
  }

  updateLoginStatus(): boolean {
    this.storedData = localStorage.getItem('isLoggedIn');
    if (this.storedData == 'true') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');

    localStorage.removeItem('loggedInUser');
  }

  getLoggedInUserName() {
    let loggedInUserDTO;
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      loggedInUserDTO = JSON.parse(JSON.parse(loggedInUserString));
      //console.log(loggedInUserDTO);
    }

    return loggedInUserDTO.username;
  }

  isAdmin() {
    let loggedInUserDTO;
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      loggedInUserDTO = JSON.parse(JSON.parse(loggedInUserString));
    }
    if (loggedInUserDTO == undefined) {
      return false;
    }
    if (loggedInUserDTO.admin == true) {
      return true;
    }
    return false;
  }
}
