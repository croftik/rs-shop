import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Shop from 'src/app/store/shop.state';
import { OrderFormService } from './order-form.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  formOrder: FormGroup;

  @Select(Shop.totalCost)
  totalCost$: Observable<number>;

  constructor(private orderFormService: OrderFormService) { }

  ngOnInit() {
    this.formOrder = new FormGroup({  
      "surname": new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      "name": new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      "fathername": new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      "city": new FormControl("", [Validators.required]),
      "street": new FormControl("", [Validators.required]),
      "house": new FormControl("", [Validators.required]),
      "entrance": new FormControl("", [Validators.min(1)]),
      "floor": new FormControl("", [Validators.min(1)]),
      "flat": new FormControl("", [Validators.min(1)]),
      "phone": new FormControl("+375", [Validators.required, Validators.pattern('^\\+[0-9]{12,12}')]),
      "date": new FormControl("", [Validators.required]),
      "comment": new FormControl("", [Validators.maxLength(250)])
    });
  }

  onClickSubmitBtn() {
    this.orderFormService.makeOrder(this.formOrder);
  }
}
