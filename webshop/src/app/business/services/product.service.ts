import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public product$: Observable<Product[]> = new Observable<Product[]>();
  private _product: BehaviorSubject<Product[]>;

  private dataStore: {
    product: Product[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { product: [] };
    this._product = new BehaviorSubject([]) as unknown as BehaviorSubject<
      Product[]
    >;
    this.product$ = this._product.asObservable();
  }

  getProductFromDb() {
    const options = { withCredentials: true };
    this.http
      .get<Product[]>('https://localhost:7054/api/Product/GetProducts', options)
      .subscribe({
        next: (result: Product[]) => {
          this.dataStore.product = result;
          this._product.next(Object.assign({}, this.dataStore).product);
          console.log(this.product$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }

  saveNewProduct(product: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('productJson', JSON.stringify(product));
    console.log(formData.get('productJson'));

    return this.http
      .post(
        'https://localhost:7054/api/Product/SaveNewProduct',
        formData,
        options
      )
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getProductFromDb();
        },
      });
  }

  deleteProduct(products: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('productJson', JSON.stringify(products));
    console.log(formData.get('productJson'));

    return this.http
      .post(
        'https://localhost:7054/api/Product/DeleteProducts',
        formData,
        options
      )
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getProductFromDb();
        },
      });
  }
}
