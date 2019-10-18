import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes, Router } from '@angular/router';
import { appRoutes } from './app.router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/customer/header/header.component';
import { FooterComponent } from './components/customer/footer/footer.component';
import { BaseComponent } from './components/customer/base/base.component';
import { HomeComponent } from './components/customer/home/home.component';
import { AboutusComponent } from './components/customer/aboutus/aboutus.component';
import { ContactComponent } from './components/customer/contact/contact.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { CheckoutComponent } from './components/customer/checkout/checkout.component';
import { ProductsComponent } from './components/customer/products/products.component';
import { ProductDetailComponent } from './components/customer/product-detail/product-detail.component';
import { MainComponent } from './components/admin/main/main.component';
import { BaseAdminComponent } from './components/admin/base-admin/base-admin.component';
import { ProductListAdminComponent } from './components/admin/product-list-admin/product-list-admin.component';
import { CategoryListAdminComponent } from './components/admin/category-list-admin/category-list-admin.component';
import { ProductDetailAdminComponent } from './components/admin/product-detail-admin/product-detail-admin.component';
import { ProductAddAdminComponent } from './components/admin/product-add-admin/product-add-admin.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UserComponent } from './components/customer/user/user.component';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FormatTitlePipe } from './pipe/format-title.pipe';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BaseComponent,
    AboutusComponent,
    ContactComponent,
    CartComponent,
    CheckoutComponent,
    ProductsComponent,
    ProductDetailComponent,
    MainComponent,
    BaseAdminComponent,
    ProductListAdminComponent,
    CategoryListAdminComponent,
    ProductDetailAdminComponent,
    ProductAddAdminComponent,
    UserListComponent,
    UserComponent,
    FormatTitlePipe,
    // HeaderAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    
    // NgxEditorModule,
    // TooltipModule.forRoot(),
    // AngularEditorModule,
    CKEditorModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyAfXQTSXB5jY1hg3Rw_odCpcId_67RQKbU',
    }),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    GoogleMapsAPIWrapper,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
