import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { UserService } from '../user.service';

import { MaterialModule } from '../material.module';
import { UserLoginData } from '../user-login-data';

import { LoginGoogleComponent } from '../login-google/login-google.component';

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
        method: "password",
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    };

    matcher = new MyErrorStateMatcher();

    constructor(private userService: UserService) {}

    ngOnInit(){
      // Log out when coming to this screen
      this.userService.logout();
    }

    // Validators for the form fields
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
        // Submit login data
        this.userService.loginWithPassword(this.model);
    }
}