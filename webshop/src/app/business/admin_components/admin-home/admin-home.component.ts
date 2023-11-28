import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  getLoggedInUserName() {
    let loggedInUserDTO;
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      loggedInUserDTO = JSON.parse(JSON.parse(loggedInUserString));
      //console.log(loggedInUserDTO);
    }

    return loggedInUserDTO.username;
  }
}
