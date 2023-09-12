import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HomeComponent } from './business/components/home/home.component';
import { ProductsComponent } from './business/components/products/products.component';


@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, HomeComponent, ProductsComponent],
  imports: [BrowserModule, AppRoutingModule, AutoCompleteModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
