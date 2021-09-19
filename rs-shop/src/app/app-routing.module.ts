import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/details/details.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { GoodsComponent } from './components/goods/goods.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'order', component: ShoppingCartComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: ':category', component: CategoryComponent },
  { path: ':category/:good', component: GoodsComponent },
  { path: ':category/:good/:id', component: DetailsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
