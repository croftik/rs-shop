import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category/category.component';
import { DetailsComponent } from './components/details/details.component';
import { GoodsComponent } from './components/goods/goods.component';

const routes: Routes = [
  { path: ':category', component: CategoryComponent },
  { path: ':category/:good', component: GoodsComponent },
  { path: ':category/:good/:id', component: DetailsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
