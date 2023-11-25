import { Injectable } from '@angular/core';
import { PromotionMail } from '../Models/PromotionMail';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  public promotionMails$: Observable<PromotionMail[]> = new Observable<
    PromotionMail[]
  >();
  private _promotionMails: BehaviorSubject<PromotionMail[]>;

  private dataStore: {
    promotionMails: PromotionMail[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { promotionMails: [] };
    this._promotionMails = new BehaviorSubject(
      []
    ) as unknown as BehaviorSubject<PromotionMail[]>;
    this.promotionMails$ = this._promotionMails.asObservable();
  }

  getPromotionMailsFromDb() {
    const options = { withCredentials: true };
    this.http
      .get<PromotionMail[]>(
        'https://localhost:7054/api/Newsletter/GetNewsletters',
        options
      )
      .subscribe({
        next: (result: PromotionMail[]) => {
          this.dataStore.promotionMails = result;
          this._promotionMails.next(
            Object.assign({}, this.dataStore).promotionMails
          );
          console.log(this.promotionMails$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }

  deletePromotionMails(mails: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('mailJson', JSON.stringify(mails));
    console.log(formData.get('mailJson'));

    return this.http
      .post(
        'https://localhost:7054/api/Newsletter/DeletePromotionMail',
        formData,
        options
      )
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getPromotionMailsFromDb();
        },
      });
  }

  saveNewPromotionMail(promotionMail: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('promotionMailJson', JSON.stringify(promotionMail));
    console.log(formData.get('promotionMailJson'));

    return this.http
      .post(
        'https://localhost:7054/api/Newsletter/SaveNewPromotionMail',
        formData,
        options
      )
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getPromotionMailsFromDb();
        },
      });
  }
}
