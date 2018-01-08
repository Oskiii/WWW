import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { of } from 'rxjs/observable/of';

import { User } from './user';
import { UserLoginData } from './user-login-data';

@Injectable()
export class UserService {

  public loggedInUser: User;

  // Get logged in user on startup
  constructor(private http: HttpClient) { 
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // Send register data to back-end
  register(user: UserLoginData){

    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    this.http.post(
      "https://oliukku.000webhostapp.com/register.php",
      (JSON.stringify(user)),
      {
        headers: headers,
      }
    )
    .subscribe((data) => {
    })
  }

  // Send password login data to back-end
  loginWithPassword(user: UserLoginData){
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    this.http.post(
      "https://oliukku.000webhostapp.com/login.php",
      (JSON.stringify(user)),
      {
        headers: headers,
      }
    )
    .subscribe((data: any) => {
      // If there was error
      if(data.error){
        console.log("Error logging in! Wrong username/pw?");
        return;
      }

      // Save logged in user
      this.loggedInUser = {
        uid: +data.data.uid,
        username: data.data.username,
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        email: data.data.email,
        role: data.data.role,
      };
      localStorage.setItem('currentUser', JSON.stringify(this.loggedInUser));
    });
  }

  // Send social login data to back-end
  loginWithSocial(socialType: string, id_token: string){
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    this.http.post(
      "https://oliukku.000webhostapp.com/login.php",
      (JSON.stringify({method: socialType, id_token: id_token})),
      {
        headers: headers,
      }
    )
    .subscribe((data: any) => {

      // If there was error, 
      if(data.error){
        console.log("Error logging in!");
        return;
      }

      this.loggedInUser = {
        uid: +data.data.uid,
        username: data.data.name,
        firstname: data.data.given_name,
        lastname: data.data.family_name,
        email: data.data.email,
        role: data.data.role,
      };
      localStorage.setItem('currentUser', JSON.stringify(this.loggedInUser));
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.loggedInUser = undefined;
  }

  // Get user by id (asyc)
  getUser(id: number): Observable<User> {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.http.post(
      "https://oliukku.000webhostapp.com/login.php",
      {
        id: id
      },
      {
        //headers: headers,
      }
    ).map((res: any) => {
        let element = res[0];

        let img: User = element as User;
        return img;
    })
  }
}
