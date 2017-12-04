import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ImgurService {

  clientId = "faf0d8c05ee6e9f";
  clientSecret = "f96d5301d8143324d428160d9cfcd3bebc798948";
  accessToken = null;
  apiBase = "https://api.imgur.com/3";

  constructor(private http: HttpClient){
    console.log("asd");
    this.getAccount("oskiii");
  }

  getAccessToken() {
      return this.accessToken;
  }

  /*
    * Request standard user information. If you need the username for the account that is logged in, it is returned in the request for an access token.
    */
  getAccount(username: string) {

      var url = this.apiBase + "/account/" + username;

      return this._makeRequest(url, "GET");
  }

  /*
    * Return all of the images associated with the account. You can page through the images by setting the page, this defaults to 0.
    */
  getAccountImages(username, page) {

      if(page === undefined) {
          page = 0;
      }

      var url = this.apiBase + "/account/" + username + "/images/" + page;

      return this._makeRequest(url, "GET");
  }

  /*
    * Upload a new image.
    */
  imageUpload(params) {

      var url = this.apiBase + "/upload";
      console.log(params);

      return this._makeRequest(url, "POST", new HttpParams().set("image", params.image));
  }

  /*
    * Returns the images in the gallery.
    */
  getGallery(section, sort, page, dateRange, showViral) {

      var galleryEndpoint = this.apiBase + "/gallery";
      if(section !== undefined) { galleryEndpoint += "/" + section; }
      if(sort !== undefined) { galleryEndpoint += "/" + sort; }
      if(dateRange !== undefined) { galleryEndpoint += "/" + dateRange; }
      if(showViral !== undefined) { galleryEndpoint += "?showViral=" + showViral; }

      return this._makeRequest(galleryEndpoint, "GET");
  }

  /**
   * Executes a request with the given url, method, and optional
   * params and returns a $q promise for the result
   * @param {string} url - the url to access
   * @param {string} method - the http method to use
   * @param {?HttpParams} params - any parameters to pass
   * @returns {Promise<object>} a promise for the result
   */
  _makeRequest(url: string, method: string, params?: HttpParams) {

    if(method === "GET"){
      this.http.get(
        url,
        {
          headers: new HttpHeaders().set('Authorization', "Client-ID " + this.clientId),
          params: params,
        }
      ).subscribe(data => {
        console.log("GET", data);
      });
    }else if(method === "POST"){
      this.http.post(
        url,
        {
          headers: new HttpHeaders().set('Authorization', "Client-ID " + this.clientId),
          params: params,
        }
      ).subscribe(data => {
        console.log("POST", data);
      });
    }
  }
}
