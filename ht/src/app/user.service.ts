import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User){
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
}
