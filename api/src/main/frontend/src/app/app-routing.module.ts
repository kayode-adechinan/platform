import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateProductComponent} from "./product/create-product/create-product.component";
import {ListProductComponent} from "./product/list-product/list-product.component";
import {EditProductComponent} from "./product/edit-product/edit-product.component";
import {NotFoundComponent} from "./common/not-found/not-found.component";


const routes: Routes = [
  {path:'', component: CreateProductComponent },
  {path:'products', component: ListProductComponent},
  {path:'products/:id', component: EditProductComponent},
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
