import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Szerviz } from '../Models/Szerviz';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SzervizService {
  public services$: Observable<Szerviz[]> = new Observable<Szerviz[]>();
  private _services: BehaviorSubject<Szerviz[]>;

  private dataStore: {
    services: Szerviz[];
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.dataStore = { services: [] };
    this._services = new BehaviorSubject([]) as unknown as BehaviorSubject<
      Szerviz[]
    >;
    this.services$ = this._services.asObservable();
  }

  saveSzervizForm(form: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('jsonData', JSON.stringify(form));
    console.log(formData.get('jsonData'));
    return this.http
      .post(
        'https://localhost:7054/api/Szerviz/saveSzervizForm',
        formData,
        options
      )
      .subscribe({
        error: (error: any) => {
          console.log(error.error);
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba!',
            detail: error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Siker!',
            detail: 'Üzenet sikeresen elküldve!',
          });
        },
      });
  }

  getServicesFromDb() {
    const options = { withCredentials: true };
    this.http
      .get<Szerviz[]>('https://localhost:7054/api/Szerviz/GetServices', options)
      .subscribe({
        next: (result: Szerviz[]) => {
          this.dataStore.services = result;
          this._services.next(Object.assign({}, this.dataStore).services);
          console.log(this.services$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }

  solveService(services: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('szervizJson', JSON.stringify(services));
    console.log(formData.get('szervizJson'));

    return this.http
      .post(
        'https://localhost:7054/api/Szerviz/solveService',
        formData,
        options
      )
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getServicesFromDb();
        },
      });
  }
}
