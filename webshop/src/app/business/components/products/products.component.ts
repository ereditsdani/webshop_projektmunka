import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../Models/Product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { ProductCategory } from '../../Models/ProductCategory';
import { ProductCategoryService } from '../../services/product-category.service';
import { Vendor } from '../../Models/Vendor';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private productCategoryService: ProductCategoryService,
    private vendorService: VendorService
  ) {}
  productCategories$: Observable<ProductCategory[]> = new Observable<
    ProductCategory[]
  >();
  productCategories: ProductCategory[] = [];
  vendors$: Observable<Vendor[]> = new Observable<Vendor[]>();
  vendors: Vendor[] = [];
  products$: Observable<Product[]> = new Observable<Product[]>();
  products: Product[] = [];
  actionOptions: any = ['Igen', 'Nem'];
  filteredProductsSuggestions: Product[] = [];
  filteredProducts: Product[] = [];
  minPrice: number = 0;
  maxPrice: number = 2000000;
  ngOnInit() {
    this.productService.getProductFromDb();
    this.vendorService.getVendorFromDb();
    this.productCategoryService.getProductCategoriesFromdb();

    this.products$ = this.productService.product$;
    this.productService.product$.subscribe((x) => {
      this.products = x;
      this.filteredProducts = x;
    });
    this.productCategories$ = this.productCategoryService.productCategories$;
    this.productCategoryService.productCategories$.subscribe((x) => {
      this.productCategories = x;
    });

    this.vendors$ = this.vendorService.vendors$;
    this.vendorService.vendors$.subscribe((x) => {
      this.vendors = x;
    });
  }

  searchProduct(event: any) {
    this.filteredProductsSuggestions = this.products.filter(
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

  onSelectMeshItem(id: any) {
    this.router.navigate(['products', id]);
  }

  getDiscountPrice(price: number, discount: any): number {
    return price - (discount / 100) * price;
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

  filterCategory(event: any) {
    console.log(event.value.categoryName);
    this.filteredProducts = this.products.filter(
      (x) => x.productCategory?.categoryName == event.value.categoryName
    );
  }

  filterVendor(event: any) {
    console.log(event.value.vendorName);
    this.filteredProducts = this.products.filter(
      (x) => x.productVendor?.vendorName == event.value.vendorName
    );
  }

  filterSale(event: any) {
    console.log(event.value);
    if (event.value == 'Igen') {
      this.filteredProducts = this.products.filter((x) => x.discount != 0);
    } else {
      this.filteredProducts = this.products.filter((x) => x.discount == 0);
    }
  }

  filterOurChoice(event: any) {
    console.log(event.value);
    if (event.value == 'Igen') {
      this.filteredProducts = this.products.filter((x) => x.ourChoice == true);
    } else {
      this.filteredProducts = this.products.filter((x) => x.ourChoice == false);
    }
  }

  resetFilter() {
    this.filteredProducts = this.products;
    this.minPrice = 0;
    this.maxPrice = 2000000;
  }

  filterPrice() {
    //todo: ha van discount azt az árat figyelembe venni
    this.filteredProducts = this.products.filter(
      (x) => x.price <= this.maxPrice && x.price >= this.minPrice
    );
  }
}
