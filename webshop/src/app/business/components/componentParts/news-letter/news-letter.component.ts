import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss'],
  providers: [MessageService]
})
export class NewsLetterComponent {
  constructor(private messageService: MessageService) {}

  valueName: string | undefined;
  valueMail: string | undefined;


  submitForm() {
    // Create an object with the form data
    const formData = {
      name: this.valueName,
      mail: this.valueMail,
      
    };
    
}
showSuccess() {
  this.messageService.add({ severity: 'success', summary: 'Feliratkozva!', detail: 'Sikeresen feliratkoztál a hírlevére!' });
}

resetForm() {
  this.valueName = undefined;
  this.valueMail = undefined;
}

}
