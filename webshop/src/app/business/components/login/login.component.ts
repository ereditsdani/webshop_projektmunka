import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username:string | undefined;
  password:string | undefined;

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Here you can add logic to authenticate the user and connect to the database
    // For simplicity, we're just logging the credentials
  }
}
