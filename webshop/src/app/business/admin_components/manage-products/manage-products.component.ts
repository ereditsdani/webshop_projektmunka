import { Component } from '@angular/core';
import { Product } from '../../Models/Product';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from '../../Models/ProductCategory';
import { Vendor } from '../../Models/Vendor';
import { ProductCategoryService } from '../../services/product-category.service';
import { VendorService } from '../../services/vendor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent {
  products$: Observable<Product[]> = new Observable<Product[]>();
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProducts: Product[] = [];
  productDialog: boolean = false;
  productCategories$: Observable<ProductCategory[]> = new Observable<
    ProductCategory[]
  >();
  productCategories: ProductCategory[] = [];
  vendors$: Observable<Vendor[]> = new Observable<Vendor[]>();
  vendors: Vendor[] = [];
  editProduct: boolean = false;
  actionOptions: any[] = [
    { label: 'Nem', value: 'off' },
    { label: 'Igen', value: 'on' },
  ];

  productForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    discount: new FormControl(0, Validators.required),
    quantity: new FormControl(0, Validators.required),
    productCategory: new FormControl('', Validators.required),
    productVendor: new FormControl('', Validators.required),
    trending: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    ourChoice: new FormControl('', Validators.required),
  });

  editProductForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    productName: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    discount: new FormControl(0, Validators.required),
    quantity: new FormControl(0, Validators.required),
    productCategory: new FormControl({}, Validators.required),
    productVendor: new FormControl({}, Validators.required),
    trending: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    ourChoice: new FormControl('', Validators.required),
  });

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private vendorService: VendorService,
    private messageService: MessageService
  ) {}

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

  filterProducts(event: any) {
    console.log(event.target.value);
    this.filteredProducts = this.products.filter(
      (x) =>
        x.productCategory?.categoryName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        x.productName.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  hideNewProductDialog() {
    this.productDialog = false;
  }
  openNewProductDialog() {
    this.productDialog = true;
  }
  openEditProductDialog() {
    this.editProduct = true;

    this.editProductForm.get('id')?.setValue(this.selectedProducts[0].id);
    this.editProductForm
      .get('productName')
      ?.setValue(this.selectedProducts[0].productName);
    this.editProductForm
      .get('productDescription')
      ?.setValue(this.selectedProducts[0].productDescription);
    this.editProductForm.get('price')?.setValue(this.selectedProducts[0].price);
    if (
      this.selectedProducts.length > 0 &&
      this.selectedProducts[0]?.discount !== undefined
    ) {
      this.editProductForm
        .get('discount')
        ?.setValue(this.selectedProducts[0].discount);
    }
    this.editProductForm
      .get('quantity')
      ?.setValue(this.selectedProducts[0].quantity);
    if (
      this.selectedProducts.length > 0 &&
      this.selectedProducts[0]?.productCategory
    ) {
      this.editProductForm
        .get('productCategory')
        ?.patchValue(this.selectedProducts[0].productCategory);
    }
    if (
      this.selectedProducts.length > 0 &&
      this.selectedProducts[0]?.productVendor
    ) {
      this.editProductForm
        .get('productVendor')
        ?.patchValue(this.selectedProducts[0].productVendor);
    }
    if (this.selectedProducts[0].trending == true) {
      this.editProductForm.get('trending')?.setValue('on');
    } else {
      this.editProductForm.get('trending')?.setValue('off');
    }
    this.editProductForm
      .get('imageUrl')
      ?.setValue(this.selectedProducts[0].imageUrl);
    if (this.selectedProducts[0].ourChoice == true) {
      this.editProductForm.get('ourChoice')?.setValue('on');
    } else {
      this.editProductForm.get('ourChoice')?.setValue('off');
    }
  }
  hideEditProductDialog() {
    this.editProduct = false;
  }
  addNewProduct() {
    if (this.productForm.get('trending')?.value == 'on') {
      this.productForm.get('trending')?.setValue('true');
    } else {
      this.productForm.get('trending')?.setValue('false');
    }
    if (this.productForm.get('ourChoice')?.value == 'on') {
      this.productForm.get('ourChoice')?.setValue('true');
    } else {
      this.productForm.get('ourChoice')?.setValue('false');
    }
    this.productService.saveNewProduct(this.productForm.value);
    this.productForm.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Termék hozzáadva!',
    });
  }
  deleteSelectedProducts() {
    this.productService.deleteProduct(this.selectedProducts);
    this.selectedProducts = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Sikeres törölve!',
    });
  }

  sendEditProduct() {
    if (this.editProductForm.get('trending')?.value == 'on') {
      this.editProductForm.get('trending')?.setValue('true');
    } else {
      this.editProductForm.get('trending')?.setValue('false');
    }
    if (this.editProductForm.get('ourChoice')?.value == 'on') {
      this.editProductForm.get('ourChoice')?.setValue('true');
    } else {
      this.editProductForm.get('ourChoice')?.setValue('false');
    }
    this.productService.editProduct(this.editProductForm.value);
    this.editProductForm.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Termék szerkesztve!',
    });
    this.editProduct = false;
    this.selectedProducts = [];
  }
}
