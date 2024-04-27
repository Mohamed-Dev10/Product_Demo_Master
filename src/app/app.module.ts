import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/product/products-list/products-list.component';
import { AppRoutingModule } from './app-routing.module';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { NavBarComponent } from './public/nav-bar/nav-bar.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateAdminComponent } from './components/template-admin/template-admin.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    EditProductComponent,
    NavBarComponent,
    TemplateAdminComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
