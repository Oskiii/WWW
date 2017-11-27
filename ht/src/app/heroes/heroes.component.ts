import { Component, OnInit } from '@angular/core';

import { Image } from '../image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  images: Image[];

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages()
        .subscribe(images => this.images = images);
  }
}
