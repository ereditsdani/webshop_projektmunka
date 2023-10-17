import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SzervizService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

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
}
