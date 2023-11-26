import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './business/components/home/home.component';
import { ProductsComponent } from './business/components/products/products.component';
import { CartComponent } from './business/components/cart/cart.component';
import { SzervizComponent } from './business/components/szerviz/szerviz.component';
import { NewsComponent } from './business/components/news/news.component';
import { GyIKComponent } from './business/components/gy-ik/gy-ik.component';
import { LoginComponent } from './business/components/login/login.component';
import { RegisterComponent } from './business/components/register/register.component';
import { SingleProductComponent } from './business/components/single-product/single-product.component';
import { FinalizeOrderComponent } from './business/components/finalize-order/finalize-order.component';
import { AdminHomeComponent } from './business/admin_components/admin-home/admin-home.component';
import { AdminPromotionMailComponent } from './business/admin_components/admin-promotion-mail/admin-promotion-mail.component';
import { AdminServiceComponent } from './business/admin_components/admin-service/admin-service.component';
import { ManageFaqComponent } from './business/admin_components/manage-faq/manage-faq.component';
import { ManageOrdersComponent } from './business/admin_components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './business/admin_components/manage-products/manage-products.component';
import { ManageUsersComponent } from './business/admin_components/manage-users/manage-users.component';
import { ProfileComponent } from './business/components/profile/profile.component';
import { authGuard } from './business/auth.guard';
import { AboutusComponent } from './ui/aboutus/aboutus.component';
import { ShippingComponent } from './ui/shipping/shipping.component';
import { PaymentComponent } from './ui/payment/payment.component';
import { RefundComponent } from './ui/refund/refund.component';

const routes: Routes = [
  { path: 'aboutus', component: AboutusComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'refund', component: RefundComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'szerviz', component: SzervizComponent },
  { path: 'news', component: NewsComponent },
  { path: 'gyik', component: GyIKComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'finalizeorder', component: FinalizeOrderComponent },
  {
    path: 'admin/home',
    canActivate: [authGuard],
    component: AdminHomeComponent,
  },
  {
    path: 'admin/managePromotionMail',
    canActivate: [authGuard],
    component: AdminPromotionMailComponent,
  },
  {
    path: 'admin/manageService',
    canActivate: [authGuard],
    component: AdminServiceComponent,
  },
  {
    path: 'admin/manageFaq',
    canActivate: [authGuard],
    component: ManageFaqComponent,
  },
  {
    path: 'admin/manageOrders',
    canActivate: [authGuard],
    component: ManageOrdersComponent,
  },
  {
    path: 'admin/manageProducts',
    canActivate: [authGuard],
    component: ManageProductsComponent,
  },
  {
    path: 'admin/manageUsers',
    canActivate: [authGuard],
    component: ManageUsersComponent,
  },
  { path: 'products/:id', component: SingleProductComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
