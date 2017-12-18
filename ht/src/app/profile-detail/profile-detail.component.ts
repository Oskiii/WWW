import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.user = { uid: id, username: "pertti" };
  }

}
