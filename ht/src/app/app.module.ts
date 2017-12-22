import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './/app-routing.module';
import { Angular2SocialLoginModule } from "angular2-social-login";

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { LoginGoogleComponent } from './login-google/login-google.component';

import { ImageService } from './image.service';
import { MessageService } from './message.service';
import { UserService } from './user.service';

let providers = {
  "google": {
    "clientId": "1087314749986-a4m6fqbter0j8248kmapt6ghhrnar1h9.apps.googleusercontent.com"
  },
  // "linkedin": {
  //   "clientId": "LINKEDIN_CLIENT_ID"
  // },
  // "facebook": {
  //   "clientId": "FACEBOOK_CLIENT_ID",
  //   "apiVersion": "<version>" //like v2.4 
  // }
};

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ImageDetailComponent,
    MessagesComponent,
    DashboardComponent,
    FileUploadComponent,
    RegisterComponent,
    LoginComponent,
    MainNavComponent,
    ProfileDetailComponent,
    LoginGoogleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    Angular2SocialLoginModule
  ],
  providers: [ ImageService, MessageService, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
