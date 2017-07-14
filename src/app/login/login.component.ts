import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from "../core/services/login/login.service";
import {Router} from "@angular/router";
import {constants} from "../core/common/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  complexForm: FormGroup;
  loginError = false;

  constructor(private loginService: LoginService, private router: Router, fb: FormBuilder) {
    this.complexForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm(form: any) {
    this.loginService.login(form.email, form.password).subscribe(
      (result) => {
        if (result && result.tokenInfo) {
          this.loginError = false;
          this.router.navigate(constants.defaultLoggedRoute);
        } else {
          this.loginError = true;
        }
      },
      (error) => {
        this.loginError = true;
      });
  }
}
