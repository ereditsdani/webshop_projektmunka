import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, map } from 'rxjs';
import { Product } from '../../Models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public productService: ProductService) {}
  products$: Observable<Product[]> = new Observable<Product[]>();
  products: Product[] = [];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit() {
    this.products$ = this.productService.product$.pipe(
      map((products) =>
        products.filter((product) => product.ourChoice === true)
      )
    );
    console.log(this.products$);
    this.productService.getProductFromDb();
  }
}
