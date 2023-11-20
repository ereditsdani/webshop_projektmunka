import { Component } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { Observable } from 'rxjs';
import { Faq } from '../../Models/Faq';

@Component({
  selector: 'app-gy-ik',
  templateUrl: './gy-ik.component.html',
  styleUrls: ['./gy-ik.component.scss'],
})
export class GyIKComponent {
  constructor(private faqService: FaqService) {}
  faqs$: Observable<Faq[]> = new Observable<Faq[]>();
  faqs: Faq[] = [];

  ngOnInit() {
    this.faqService.getFaqsFromDb();
    this.faqs$ = this.faqService.faqs$;
    this.faqService.faqs$.subscribe((x) => {
      this.faqs = x;
    });
  }
}
