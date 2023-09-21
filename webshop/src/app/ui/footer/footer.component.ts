import { Component } from '@angular/core';
import { ProductCategoryService } from 'src/app/business/services/product-category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private productCategoriesServcie: ProductCategoryService) {}

  ngOnInit() {
    this.productCategoriesServcie.getProductCategoriesFromdb();
  }
}
