import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserService {

  constructor() { }

  register(user: User){
    console.log(user);
  }
}
