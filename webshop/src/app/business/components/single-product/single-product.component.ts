import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../Models/Product';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent {
  id: number = 0;
  products$: Observable<Product[]> = new Observable<Product[]>();
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getProductFromDb();
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      if (idString) {
        this.id = parseInt(idString, 10);
        console;
        this.products$ = this.productService.product$;
        this.productService.product$.subscribe((x) => {
          this.products = x;
          this.products = this.products.filter((x) => x.id == this.id);
        });
      } else {
        console.error('id parameter not found in the route.');
      }
    });
  }
  getNettoProductPrice(price: any) {
    return price / 1.27;
  }
  addToCart(product: Product) {
    if (product.orderAmount === undefined) {
      product.orderAmount = 0;
    }
    if (product.orderAmount < product.quantity) {
      product.orderAmount++;
      this.cartService.addToCart(product);

      this.displayMessage(
        'success',
        'Hozzáadva a kosárhoz!',
        `Hozzáadtál 1x ${product.productName} elemet a kosárhoz!`
      );

      // Manually trigger change detection
      this.triggerChangeDetection();
    }
  }

  displayMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  triggerChangeDetection() {
    this.cdr.detectChanges();
  }

  getDiscountPrice(price: number, discount: any): number {
    return price - (discount / 100) * price;
  }

  getNettoProductDiscountPrice(price: number, discount: any) {
    return (price - (discount / 100) * price) / 1.27;
  }
}
