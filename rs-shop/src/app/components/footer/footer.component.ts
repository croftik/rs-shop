import { Component, OnInit } from '@angular/core';
import IContacts from 'src/app/models/IContacts';
import { contacts } from 'src/app/utils/data';
import { Socials } from 'src/app/utils/enums';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contacts: IContacts[];

  socials = Socials;

  constructor() {
    this.contacts = contacts;
  }

  ngOnInit() {
    
  }

}
