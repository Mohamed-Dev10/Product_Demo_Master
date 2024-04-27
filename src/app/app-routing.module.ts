import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { ProductsListComponent } from './components/product/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { TemplateAdminComponent } from './components/template-admin/template-admin.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path:"",component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"admin",component:TemplateAdminComponent, canActivate: [AuthGuard],
    children:[
      {path:"",component:HomeComponent },
      {path:"product-list",component:ProductsListComponent },
      { path: "edit-product/:id", component: EditProductComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
