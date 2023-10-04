import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  saveOrder(order: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('orderJson', JSON.stringify(order));
    console.log(formData.get('orderJson'));
    return this.http
      .post('https://localhost:7054/api/Order/SaveOrder', formData, options)
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }
}
