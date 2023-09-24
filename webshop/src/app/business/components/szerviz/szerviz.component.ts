import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-szerviz',
  templateUrl: './szerviz.component.html',
  styleUrls: ['./szerviz.component.scss'],
  providers: [MessageService]
})
export class SzervizComponent {
  constructor(private messageService: MessageService) {}

  valueMail: string | undefined;
  valueOrder: string | undefined;
  valueIssue: string | undefined;

  submitForm() {
    // Create an object with the form data
    const formData = {
      email: this.valueMail,
      order: this.valueOrder,
      issue: this.valueIssue
    };
    
}
showSuccess() {
  this.messageService.add({ severity: 'success', summary: 'Siker!', detail: 'Üzenet sikeresen elküldve!' });
}

resetForm() {
  this.valueMail = undefined;
  this.valueOrder = undefined;
  this.valueIssue = undefined;
}


}


