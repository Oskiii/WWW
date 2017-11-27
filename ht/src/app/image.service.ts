import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Image } from './image';
import { IMAGES } from './mock-images';
import { MessageService } from './message.service';

@Injectable()
export class ImageService {

  constructor(private messageService: MessageService) { }

  getImages(): Observable<Image[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(IMAGES);
  }

  getImage(id: number): Observable<Image> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(IMAGES.find(image => image.id === id));
  }
}
