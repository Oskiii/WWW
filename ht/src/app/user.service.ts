import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { User } from './user';
import { UserLoginData } from './user-login-data';

@Injectable()
export class UserService {

  get loggedInUser(): User{
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  constructor(private http: HttpClient) { }

  register(user: UserLoginData){
    console.log(user);

    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    this.http.post(
      "http://localhost:8888/ht/php/register.php",
      (JSON.stringify(user)),
      {
        headers: headers,
      }
    )
    .subscribe((data) => {
      console.log(data);
    })
  }

  login(user: UserLoginData){
    console.log(user);

    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    this.http.post(
      "http://localhost:8888/ht/php/login.php",
      (JSON.stringify(user)),
      {
        headers: headers,
      }
    )
    .subscribe((data: any) => {
      console.log(data);
      //this.updateLoggedInUserWith(+data.data.uid, data.data.username);
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
