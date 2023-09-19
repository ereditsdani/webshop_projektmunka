import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { Button, ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HomeComponent } from './business/components/home/home.component';
import { ProductsComponent } from './business/components/products/products.component';
import { CarouselModule } from 'primeng/carousel';
import { MainSliderComponent } from './business/components/componentParts/main-slider/main-slider.component';
import { Tag, TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { CartComponent } from './cart/cart.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './business/services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    MainSliderComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    MessagesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
  ],
  providers: [CartService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
