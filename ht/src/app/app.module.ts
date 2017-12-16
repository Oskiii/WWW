import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { ImageService } from './image.service';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ImageDetailComponent,
    MessagesComponent,
    DashboardComponent,
    FileUploadComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [ ImageService, MessageService, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
