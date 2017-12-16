import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { UserService } from '../user.service';

import { MaterialModule } from '../material.module';
import { UserLoginData } from '../user-login-data';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    registerForm: FormGroup;
    model: UserLoginData = {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    };

    constructor(private userService: UserService) {}

    ngOnInit(){
      this.userService.logout();

        this.registerForm = new FormGroup({
            'username': new FormControl('', [
                Validators.required,
                Validators.pattern(/([a-zA-Z])\w+/),
                Validators.minLength(3),
                Validators.maxLength(20),
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.pattern(/([a-zA-Z])\w+/),
                Validators.minLength(8),
            ]),
        });
    }

    usernameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9]+$/),
    Validators.minLength(3),
    Validators.maxLength(20),
    ]);

    passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/([a-zA-Z])\w+/),
    Validators.minLength(8),
    ]);

    onSubmit(){
        this.userService.login(this.model);
    }
}