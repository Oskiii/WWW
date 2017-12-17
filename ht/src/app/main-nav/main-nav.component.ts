import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  currentUser: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(this.userService.loggedInUser){
      this.currentUser = this.userService.loggedInUser.username;
      console.log(this.currentUser);
    }
  }

}
