import { Component } from '@angular/core';
import { User } from '../../Models/User';

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

  ngOnInit() {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      this.loggedInUserDTO = JSON.parse(JSON.parse(loggedInUserString));
    }
    this.email = this.loggedInUserDTO!.email;
    this.phoneNumber = this.loggedInUserDTO!.phoneNumber;
    this.address =
      this.loggedInUserDTO!.postalNumber + ' ' + this.loggedInUserDTO!.address;
  }
}
