import { Injectable } from '@angular/core';
import { ProductCategory } from '../Models/productCategory';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  public productCategories$: Observable<ProductCategory[]> = new Observable<
    ProductCategory[]
  >();
  private _productCategories: BehaviorSubject<ProductCategory[]>;

  private dataStore: {
    productCategories: ProductCategory[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { productCategories: [] };
    this._productCategories = new BehaviorSubject(
      []
    ) as unknown as BehaviorSubject<ProductCategory[]>;
    this.productCategories$ = this._productCategories.asObservable();
  }

  getProductCategoriesFromdb() {
    const options = { withCredentials: true };
    this.http
      .get<ProductCategory[]>(
        'https://localhost:7054/api/ProductCategory/GetProductCategories',
        options
      )
      .subscribe({
        next: (result: ProductCategory[]) => {
          this.dataStore.productCategories = result;
          this._productCategories.next(
            Object.assign({}, this.dataStore).productCategories
          );
          console.log(this.productCategories$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }
}
