import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(private userService: UserService) {}

  login() {
    this.userService.loginUser(this.username, this.password);
  }
}
