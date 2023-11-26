import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

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
    if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('passwordAgain')?.value
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Hiba',
        detail: 'A két jelszónak egyeznie kell!',
      });
    } else {
      console.log(this.registerForm.value);
      this.userService.registerUser(this.registerForm.value);
      this.registerForm.reset();
    }
  }
}
