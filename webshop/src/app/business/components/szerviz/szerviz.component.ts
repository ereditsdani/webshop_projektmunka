import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SzervizService } from '../../services/szerviz.service';

@Component({
  selector: 'app-szerviz',
  templateUrl: './szerviz.component.html',
  styleUrls: ['./szerviz.component.scss'],
  providers: [MessageService, SzervizService],
})
export class SzervizComponent {
  constructor(
    private messageService: MessageService,
    private szervizService: SzervizService
  ) {}

  szerviz = new FormGroup({
    email: new FormControl('', Validators.required),
    orderNumber: new FormControl(null, Validators.required),
    errorDescription: new FormControl('', Validators.required),
  });

  submitForm() {
    console.log(this.szerviz.value);
    this.szervizService.saveSzervizForm(this.szerviz.value);
    this.szerviz.reset();
    this.showSuccess();
  }

  showSuccess() {}
}
