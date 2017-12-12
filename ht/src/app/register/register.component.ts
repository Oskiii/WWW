import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { UserService } from '../user.service';
import { User } from '../user';

import { MaterialModule } from '../material.module';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    model: User = {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    };

    constructor(private userService: UserService) {}

    ngOnInit(){
        this.registerForm = new FormGroup({
            'email': new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
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
    
    firstnameFormControl: FormControl = new FormControl('', [
    Validators.required,
    ]);

    lastnameFormControl: FormControl = new FormControl('', [
    Validators.required,
    ]);

    usernameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9]+$/),
    Validators.minLength(3),
    Validators.maxLength(20),
    ]);

    emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    ]);

    passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/([a-zA-Z])\w+/),
    Validators.minLength(8),
    ]);

    password2FormControl: FormControl = new FormControl('', [
        Validators.required,
    ])

    doMatch(a, b){
        return a === b;
    }

    matcher = new MyErrorStateMatcher();

    onSubmit(){
        if(this.firstnameFormControl.errors === null &&
            this.lastnameFormControl.errors === null &&
            this.emailFormControl.errors === null &&
            this.usernameFormControl.errors === null &&
            this.passwordFormControl.errors === null &&
            this.password2FormControl.errors === null &&
            this.doMatch(this.model.password, this.model.password2)
        ){
            console.log("no errors");
            this.userService.register(this.model);
        }else{
            console.log("errors in form");
        }
    }
}