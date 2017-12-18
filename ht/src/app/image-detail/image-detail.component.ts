import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../image';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ImageService }  from '../image.service';
import { UserService } from '../user.service';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  @Input() image: Image;
  canDelete: boolean;

  constructor(private route: ActivatedRoute,
    private imageService: ImageService,
    private userService: UserService,
    private location: Location,
  ) { }

    ngOnInit(): void {
      this.getImage();
    }
    
    getImage(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.imageService.getImage(id)
        .subscribe(hero => {
          this.image = hero;

          console.log(this.userService.loggedInUser.uid, this.image.owner.uid);
          
          this.canDelete = 
          (this.userService.loggedInUser.uid == this.image.owner.uid) 
          || this.userService.loggedInUser.role === "admin";
        });
    }

    deleteImg(): void {
      console.log("deleting image: " + this.image.id);
      this.imageService.deleteImage(this.image.id);
    }

    goBack(): void {
      this.location.back();
    }
}
