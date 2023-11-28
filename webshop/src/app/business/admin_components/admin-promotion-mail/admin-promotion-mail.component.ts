import { Component } from '@angular/core';
import { NewsLetterComponent } from '../../components/componentParts/news-letter/news-letter.component';
import { Observable } from 'rxjs';
import { PromotionMail } from '../../Models/PromotionMail';
import { MessageService } from 'primeng/api';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-admin-promotion-mail',
  templateUrl: './admin-promotion-mail.component.html',
  styleUrls: ['./admin-promotion-mail.component.scss'],
})
export class AdminPromotionMailComponent {
  promotionMails$: Observable<PromotionMail[]> = new Observable<
    PromotionMail[]
  >();
  promotionMails: PromotionMail[] = [];
  selectedPromotionMails: PromotionMail[] = [];

  constructor(
    private newsLetterService: NewsletterService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.newsLetterService.getPromotionMailsFromDb();
    this.promotionMails$ = this.newsLetterService.promotionMails$;
    this.newsLetterService.promotionMails$.subscribe((x) => {
      this.promotionMails = x;
    });
  }

  deletePromotionMail() {
    this.newsLetterService.deletePromotionMails(this.selectedPromotionMails);
    this.selectedPromotionMails = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Feliratkozó törölve!',
    });
  }
}
