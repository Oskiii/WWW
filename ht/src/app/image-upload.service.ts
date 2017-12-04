import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  postImage(image: File) {

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

}
