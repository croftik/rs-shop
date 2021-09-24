import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../header/header.service';
import { LoginFormService } from './login-form.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  signUpForm: FormGroup;

  signInForm: FormGroup;

  isActive: boolean;

  constructor(private loginFormService: LoginFormService, public headerService: HeaderService) { 
    this.isActive = false;
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      "firstName": new FormControl("", Validators.required),
      "lastName": new FormControl("", Validators.required),
      "login": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    });

    this.signInForm = new FormGroup({
      "login": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
    });
  }

  showSignInForm() {
    this.isActive = false;
  }

  showSignUpForm() {
    this.isActive = true;
  }

  OnClickBtnSignUp() {
    this.loginFormService.register(this.signUpForm.value);
  }

  OnClickBtnSignIn() {
    this.loginFormService.login(this.signInForm.value);
  }
}
