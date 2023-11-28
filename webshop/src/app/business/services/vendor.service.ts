import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vendor } from '../Models/Vendor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  public vendors$: Observable<Vendor[]> = new Observable<Vendor[]>();
  private _vendors: BehaviorSubject<Vendor[]>;

  private dataStore: {
    vendors: Vendor[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { vendors: [] };
    this._vendors = new BehaviorSubject([]) as unknown as BehaviorSubject<
      Vendor[]
    >;
    this.vendors$ = this._vendors.asObservable();
  }

  getVendorFromDb() {
    const options = { withCredentials: true };
    this.http
      .get<Vendor[]>('https://localhost:7054/api/Vendor/GetVendors', options)
      .subscribe({
        next: (result: Vendor[]) => {
          this.dataStore.vendors = result;
          this._vendors.next(Object.assign({}, this.dataStore).vendors);
          console.log(this.vendors$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }
}
