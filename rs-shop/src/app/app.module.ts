import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import Shop from './store/shop.state';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { GoodsComponent } from './components/goods/goods.component';
import { OneGoodComponent } from './components/one-good/one-good.component';
import { FormatPricePipe } from './pipes/format-price/format-price.pipe';
import { FormatRatingPipe } from './pipes/format-rating/format-rating.pipe';
import { DetailsComponent } from './components/details/details.component';
import { CategoryComponent } from './components/category/category.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchGoodsComponent } from './components/search-goods/search-goods.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    CatalogComponent,
    FooterComponent,
    GoodsComponent,
    OneGoodComponent,
    FormatPricePipe,
    FormatRatingPipe,
    DetailsComponent,
    CategoryComponent,
    ShoppingCartComponent,
    SearchGoodsComponent,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([Shop], {
      developmentMode: !environment.production,
    }),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
