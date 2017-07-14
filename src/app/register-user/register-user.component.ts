import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {Router} from "@angular/router";
import {SignupService} from "../core/services/signup/signup.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  complexForm: FormGroup;
  private registerSubs: any;

  constructor(private signupService: SignupService, private router: Router, fb: FormBuilder) {
    const password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.complexForm = fb.group({
      'email': [null, [Validators.required, CustomValidators.email]],
      'password': password,
      'confirmPassword': [null, [Validators.required, CustomValidators.equalTo(password)]]
    });
  }

  ngOnDestroy() {
    this.unsusbcribe(this.registerSubs);
  }

  private unsusbcribe(subscription: any) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  submitForm(form: FormGroup) {
    this.unsusbcribe(this.registerSubs);

    this.registerSubs = this.signupService.register(form.value.email, form.value.password).subscribe(
      (res) => {
        alert('The token has been sent to your mail, please check your tray');
      },
      (error) => {
        if (error.status && error.status === 409) {
          alert('The email is already in use');
        } else {
          alert('There was a communication error, please try later.');
          this.router.navigateByUrl('/');
          location.reload();
        }
      }
    );
  }

  ngOnInit() {
  }

}
