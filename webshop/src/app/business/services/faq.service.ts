import { Injectable } from '@angular/core';
import { Faq } from '../Models/Faq';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
