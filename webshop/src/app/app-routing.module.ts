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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'szerviz', component: SzervizComponent },
  { path: 'news', component: NewsComponent },
  { path: 'gyik', component: GyIKComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
