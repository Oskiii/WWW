import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { of } from 'rxjs/observable/of';

import { Image } from './image';
import { MessageService } from './message.service';
import { User } from './user';

@Injectable()
export class ImageService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  // Send image data to back-end
  postImage(image: FormData) {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    this.http.post(
      "http://localhost:8888/ht/php/file-upload.php",
      (image),
      {
        headers: headers,
      }
    )
    .subscribe((data) => {
      console.log(data);
    })
  }

  // Delete image of id
  deleteImage(id: number) {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    this.http.post(
      "http://localhost:8888/ht/php/file-delete.php",
      { id: id },
      {
        headers: headers,
      }
    )
    .subscribe((data) => {
      console.log(data);
    })
  }

  // Get all images from back-end, returns and observable for easy access
  getAllImages(): Observable<Image[]>{
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.http.post(
      "http://localhost:8888/ht/php/file-upload.php",
      {
        id: -1
      },
      {
        //headers: headers,
      }
    ).map((res: Array<any>) => {
        let images = [];
        res.forEach(element => {
            let img = new Image();
            img.id = element.imgid;
            img.path = "http://localhost:8888/ht/php/" + element.filepath;
            img.title = element.title;
            img.owner = element as User;
            images.push(img);
        });
        return images;
    })
  }

  // Get image by id
  getImage(id: number): Observable<Image> {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.http.post(
      "http://localhost:8888/ht/php/file-upload.php",
      {
        id: id
      },
      {
        //headers: headers,
      }
    ).map((res: any) => {
        let element = res[0];
        let img = new Image();
        img.id = element.imgid;
        img.path = "http://localhost:8888/ht/php/" + element.filepath;
        img.title = element.title;
        img.owner = element as User;

        console.log(img);
        return img;
    })
  }
}
