import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../image';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ImageService }  from '../image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  @Input() image: Image;

  constructor(private route: ActivatedRoute,
    private imageService: ImageService,
    private location: Location) { }

    ngOnInit(): void {
      this.getImage();
    }
    
    getImage(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.imageService.getImage(id)
        .subscribe(hero => this.image = hero);
    }

    goBack(): void {
      this.location.back();
    }
}
