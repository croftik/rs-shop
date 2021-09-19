import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {

  constructor(private httpService: HttpService, private store: Store) { }

  makeOrder(form: FormGroup) {
    const address = `г.${form.controls.city.value}, ул.${form.controls.street.value}, д.${form.controls.house.value}, п.${form.controls.entrance.value}, э.${form.controls.floor.value} кв.${form.controls.flat.value}`;
    const items = this.store.selectSnapshot(Shop.cartItems);
    const body = {
      "items": items,
      "details": {
        "name": form.controls.name.value,
        "address": address,
        "phone": form.controls.phone.value,
        "timeToDeliver": form.controls.date.value,
        "comment": form.controls.comment.value,
      }
    }
    this.httpService.postOrder(body).subscribe();
  }

}
