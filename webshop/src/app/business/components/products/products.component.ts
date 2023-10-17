import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../Models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(private productService: ProductService, private router: Router) {}
  products$: Observable<Product[]> = new Observable<Product[]>();
  products: Product[] = [];
  filteredProducts: Product[] = [];
  asd: String[] = ['a', 'aa', 'aaa'];
  filteredAsd: String[] = [];

  ngOnInit() {
    this.productService.getProductFromDb();

    this.products$ = this.productService.product$;
    this.productService.product$.subscribe((x) => {
      this.products = x;
    });
  }

  searchProduct(event: any) {
    this.filteredProducts = this.products.filter(
      (x) =>
        x.productName.toLowerCase().includes(event.query.toLowerCase()) ||
        x.productCategory?.categoryName
          .toLowerCase()
          .includes(event.query.toLowerCase())
    );
  }

  onSelectItem(event: any) {
    const selectedProduct = event;
    const selectedProductId = selectedProduct.id;
    this.router.navigate(['products', selectedProductId]);
  }
}
