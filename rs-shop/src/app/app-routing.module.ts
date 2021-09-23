import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/details/details.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { GoodsComponent } from './components/goods/goods.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SliderComponent } from './components/slider/slider.component';
import { WaitListComponent } from './components/wait-list/wait-list.component';

const routes: Routes = [
  { path: 'main', component: SliderComponent },
  { path: 'order', component: ShoppingCartComponent },
  { path: 'order/edit', component: OrderEditComponent },
  { path: 'wait-list', component: WaitListComponent },
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
