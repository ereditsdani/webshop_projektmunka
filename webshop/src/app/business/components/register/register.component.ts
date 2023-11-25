import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private userService: UserService) {}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required),
    phoneNumber: new FormControl('+36', Validators.required),
    postalNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  register() {
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value);
    this.registerForm.reset();
    //jelszót össze kell haosnlítani
    //this.registerForm.reset();
  }
}
