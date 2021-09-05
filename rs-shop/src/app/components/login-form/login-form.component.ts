import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClickSignUp() {
    //container.classList.add("right-panel-active");
  }

  onClickSignIn() {
    //container.classList.remove("right-panel-active");
  }

}
