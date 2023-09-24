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
import { CartComponent } from './business/components/cart/cart.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './business/services/cart.service';
import { SzervizComponent } from './business/components/szerviz/szerviz.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NewsLetterComponent } from './business/components/componentParts/news-letter/news-letter.component';
import { NewsComponent } from './business/components/news/news.component';
import { AccordionModule } from 'primeng/accordion';
import { GyIKComponent } from './business/components/gy-ik/gy-ik.component';
import { LoginComponent } from './business/components/login/login.component';
import { RegisterComponent } from './business/components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    MainSliderComponent,
    CartComponent,
    SzervizComponent,
    NewsLetterComponent,
    NewsComponent,
    GyIKComponent,
    LoginComponent,
    RegisterComponent,
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
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CartService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
