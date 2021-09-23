import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { IDetails, IOrder } from 'src/app/models/user.model';
import Shop from 'src/app/store/shop.state';
import { OrderEditService } from './order-edit.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  formOrderEdit: FormGroup;

  details: IDetails;

  constructor(private store: Store, private orderEditService: OrderEditService) { }

  ngOnInit() {
    this.details = this.store.selectSnapshot(Shop.editOrder).details;
    const [surname, name, fathername]  = this.details.name.split(' ');
    const newArray = this.details.address.split(',').map(element => element.split('.'));
    const [[,city]] = newArray;
    const [,[,street]] = newArray;
    const [,,[,house]] = newArray;
    const [,,,[,entrance]] = newArray;
    const [,,,,[,floor]] = newArray;
    const [,,,,,[,flat]] = newArray;
    const phone = this.details.phone;
    const date = this.details.timeToDeliver;
    const comment = this.details.comment;
    this.formOrderEdit = new FormGroup({  
      "surname": new FormControl(`${surname}`, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      "name": new FormControl(`${name}`, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      "fathername": new FormControl(`${fathername}`, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      "city": new FormControl(`${city}`, [Validators.required]),
      "street": new FormControl(`${street}`, [Validators.required]),
      "house": new FormControl(`${house}`, [Validators.required]),
      "entrance": new FormControl(`${entrance}`, [Validators.min(1)]),
      "floor": new FormControl(`${floor}`, [Validators.min(1)]),
      "flat": new FormControl(`${flat}`, [Validators.min(1)]),
      "phone": new FormControl(`${phone}`, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      "date": new FormControl(`${date}`, [Validators.required]),
      "comment": new FormControl(`${comment}`, [Validators.maxLength(250)])
    });
  }

  clickOnSaveBtn() {
    this.orderEditService.saveNewOrder(this.formOrderEdit);
  }

}
