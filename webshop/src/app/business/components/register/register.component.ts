import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username:string | undefined;
  password:string | undefined;
  mail:string | undefined;
  passwordRE:string | undefined;
  phone:string | undefined;
  postalNumber:string | undefined;
  address:string | undefined;
  
  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Here you can add logic to authenticate the user and connect to the database
    // For simplicity, we're just logging the credentials
  }
}
