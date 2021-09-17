import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  isActive: boolean;

  constructor() { 
    this.isActive = false;
  }

  ngOnInit() {
  }

  showSignInForm() {
    this.isActive = false;
  }

  showSignUpForm() {
    this.isActive = true;
  }

}
