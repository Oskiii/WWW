import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    model = {
        firstname: "Bob",
        lastname: "McExample",
        email: "example@gmail.com",
        username: "Bobby2",
        password: "pw",
    }

    constructor() { }

    ngOnInit() {
    }

    get diagnostic() { return JSON.stringify(this.model); }
}
