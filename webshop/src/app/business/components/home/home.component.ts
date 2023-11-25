import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, map } from 'rxjs';
import { Product } from '../../Models/Product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromotionMail } from '../../Models/PromotionMail';
import { NewsletterService } from '../../services/newsletter.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    public productService: ProductService,
    public promotionMailService: NewsletterService,
    public messageService: MessageService
  ) {}
  products$: Observable<Product[]> = new Observable<Product[]>();
  products: Product[] = [];
  disocuntedProducts$: Observable<Product[]> = new Observable<Product[]>();
  disocuntedProducts: Product[] = [];

  newLetterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

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

    this.disocuntedProducts$ = this.productService.product$.pipe(
      map((disocuntedProducts) =>
        disocuntedProducts.filter(
          (disocuntedProducts) => disocuntedProducts.discount != 0
        )
      )
    );

    console.log(this.products$);
    this.productService.getProductFromDb();
  }

  getDiscountPrice(price: number, discount: any): number {
    return price - (discount / 100) * price;
  }

  addNewPromotionMail() {
    this.promotionMailService.saveNewPromotionMail(this.newLetterForm.value);
    this.newLetterForm.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Sikeres feliratkozás!',
    });
  }
}
