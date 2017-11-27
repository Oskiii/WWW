import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageService } from './image.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImgurService } from './imgur.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ImageDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ImageService, MessageService, ImgurService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
