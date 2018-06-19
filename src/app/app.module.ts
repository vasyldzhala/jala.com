import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MasonryGalleryAcrossComponent } from './masonry-gallery-across/masonry-gallery-across.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MasonryGalleryAcrossComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
