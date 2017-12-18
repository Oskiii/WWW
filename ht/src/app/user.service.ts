import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { of } from 'rxjs/observable/of';

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
      localStorage.setItem('currentUser', JSON.stringify({ uid: +data.data.uid, username: data.data.username}));
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  getUser(id: number): Observable<User> {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.http.post(
      "http://localhost:8888/ht/php/login.php",
      {
        id: id
      },
      {
        //headers: headers,
      }
    ).map((res: any) => {
        let element = res[0];
        console.log(element);

        let img: User = element as User;
        return img;
    })
  }
}
