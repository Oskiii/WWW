import { Component, OnInit } from '@angular/core';
import { Image } from '../image';
import { ImageService } from '../image.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  images: Image[] = [];

  currentUser: string;

  constructor(private imageService: ImageService, private userService: UserService) { }

  ngOnInit() {
    this.getImages();

    if(this.userService.loggedInUser){
      this.currentUser = this.userService.loggedInUser.username;
      console.log(this.currentUser);
    }
  }

  getImages(): void {
    this.imageService.getAllImages()
      .subscribe(images => this.images = images);
  }
}