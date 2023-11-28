import { Injectable } from '@angular/core';
import { Faq } from '../Models/Faq';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  public faqs$: Observable<Faq[]> = new Observable<Faq[]>();
  private _faqs: BehaviorSubject<Faq[]>;

  private dataStore: {
    faqs: Faq[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { faqs: [] };
    this._faqs = new BehaviorSubject([]) as unknown as BehaviorSubject<Faq[]>;
    this.faqs$ = this._faqs.asObservable();
  }

  getFaqsFromDb() {
    const options = { withCredentials: true };
    this.http
      .get<Faq[]>('https://localhost:7054/api/Faq/GetFaqs', options)
      .subscribe({
        next: (result: Faq[]) => {
          this.dataStore.faqs = result;
          this._faqs.next(Object.assign({}, this.dataStore).faqs);
          console.log(this.faqs$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }

  saveNewFaq(faq: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('faqJson', JSON.stringify(faq));
    console.log(formData.get('faqJson'));

    return this.http
      .post('https://localhost:7054/api/Faq/SaveNewFaq', formData, options)
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getFaqsFromDb();
        },
      });
  }

  deleteFaq(faqs: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('faqJson', JSON.stringify(faqs));
    console.log(formData.get('faqJson'));

    return this.http
      .post('https://localhost:7054/api/Faq/DeleteFaqs', formData, options)
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getFaqsFromDb();
        },
      });
  }
}
