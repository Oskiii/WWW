import { Component } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pictur';

  constructor(meta: Meta, title: Title) {
    
    title.setTitle(this.title);

    meta.addTags([
      { name: 'author',   content: 'Oskari Liukku'},
      { name: 'keywords', content: 'imgur, image upload, school project, www, file'},
      { name: 'description', content: 'Imgur clone made for LUT.' }
    ]);

  }
}
