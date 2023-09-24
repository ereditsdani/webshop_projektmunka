import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SzervizService {
  constructor(private http: HttpClient) {}

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
          console.log(error.message);
        },
      });
  }
}
