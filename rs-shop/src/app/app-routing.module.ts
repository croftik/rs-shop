import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { GoodsComponent } from './components/goods/goods.component';

const routes: Routes = [
  { path: ':category', component: GoodsComponent },
  { path: ':category/:good', component: GoodsComponent },
  { path: ':category/:good/:id', component: DetailsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
