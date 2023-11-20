import { Component } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { Faq } from '../../Models/Faq';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-faq',
  templateUrl: './manage-faq.component.html',
  styleUrls: ['./manage-faq.component.scss'],
})
export class ManageFaqComponent {
  faqs$: Observable<Faq[]> = new Observable<Faq[]>();
  faqs: Faq[] = [];
  selectedFaq: Faq[] = [];
  faqDialog: boolean = false;

  constructor(
    private faqService: FaqService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.faqService.getFaqsFromDb();
    this.faqs$ = this.faqService.faqs$;
    this.faqService.faqs$.subscribe((x) => {
      this.faqs = x;
    });
  }

  faqForm = new FormGroup({
    questionTitle: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  });

  openNewFawDialog() {
    this.faqDialog = true;
  }

  hideNewFaqDialog() {
    this.faqDialog = false;
  }

  deleteSelectedFaq() {
    this.faqService.deleteFaq(this.selectedFaq);
    this.selectedFaq = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'GyIK törölve!',
    });
  }

  addNewFaq() {
    this.faqService.saveNewFaq(this.faqForm.value);
    this.faqForm.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'GyIK hozzáadva!',
    });
  }
}
