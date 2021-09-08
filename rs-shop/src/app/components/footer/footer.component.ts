import { Component, OnInit } from '@angular/core';
import IContacts from 'src/app/models/contacts.model';
import { contacts, footerInfo } from 'src/app/utils/data';
import { Socials } from 'src/app/utils/enums';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contacts: IContacts[];

  socials = Socials;

  footerInfo = footerInfo;

  constructor() {
    this.contacts = contacts;
  }

  ngOnInit() {}

}
