import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ImgurService {

  clientId = "95b8af5eefc7da4";
  clientSecret = "3996b6be9d5b94f3bbbe6bacce8edc199aefe55c";
  accessToken = null;
  apiBase = "https://api.imgur.com/3";

  constructor(private http: HttpClient){
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
    * Return the images the user has favorited in the gallery.
    */
  getAccountGalleryFavorites(username: string) {

      var url = this.apiBase + "/account/" + username + "/gallery_favorites";

      return this._makeRequest(url, "GET");
  }

  /*
    * Returns the users favorited images, only accessible if you're logged in as the user.
    */
  getAccountFavorites(username: string) {

      var url = this.apiBase + "/account/" + username + "/favorites";

      return this._makeRequest(url, "GET");
  }

  /*
    * Return the images a user has submitted to the gallery
    */
  getAccountSubmissions(username) {

      var url = this.apiBase + "/account/" + username + "/submissions";

      return this._makeRequest(url, "GET");
  }

  /*
    * Returns the account settings, only accessible if you're logged in as the user.
    */
  getAccountSettings(username) {

      var url = this.apiBase + "/account/" + username + "/settings";

      return this._makeRequest(url, "GET");
  }

  /*
    * Updates the account settings for a given user, the user must be logged in.
    */
  setAccountSettings(username, params) {

      var url = this.apiBase + "/account/" + username + "/settings";

      return this._makeRequest(url, "POST", params);
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

      var url = this.apiBase + "/image";

      return this._makeRequest(url, "POST", params);
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

  /*
    * Get list of all conversations for the logged in user.
    */
  getConversationList() {

      var url = this.apiBase + "/conversations";

      return this._makeRequest(url, "GET");
  }

  /**
   * Executes a request with the given url, method, and optional
   * params and returns a $q promise for the result
   * @param {string} url - the url to access
   * @param {string} method - the http method to use
   * @param {?object} params - any parameters to pass
   * @returns {Promise<object>} a promise for the result
   */
  _makeRequest(url: string, method: string, params?: object) {

      if(method === "get")
      this.http.get(
        url,
        {
          headers: new HttpHeaders()
        }
      )
      
  }
}
