import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SetToken } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class OrderEditService {

  token: string = <string>localStorage.getItem('user');

  constructor(private store: Store, private httpService: HttpService, private navService: NavigationService) { }

  saveNewOrder(form: FormGroup) {
    const address = `г.${form.controls.city.value}, ул.${form.controls.street.value}, д.${form.controls.house.value}, п.${form.controls.entrance.value}, э.${form.controls.floor.value}, кв.${form.controls.flat.value}`;
    const fio = `${form.controls.surname.value} ${form.controls.name.value} ${form.controls.fathername.value}`
    const id = this.store.selectSnapshot(Shop.editOrderId);
    const body = {
      "id": id,
      "details": {
        "name": fio,
        "address": address,
        "phone": form.controls.phone.value,
        "timeToDeliver": form.controls.date.value,
        "comment": form.controls.comment.value,
      }
    }
    this.httpService.putOrder(body).subscribe(() => this.store.dispatch(new SetToken(this.token)));
    setTimeout(() => this.navService.navigateToWailList(), 1000); 
  }

}
