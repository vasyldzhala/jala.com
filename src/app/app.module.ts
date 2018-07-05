import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MasonryGalleryAcrossComponent } from './masonry-gallery-across/masonry-gallery-across.component';
import { PortfolioThumbnailsComponent } from './portfolio-thumbnails/portfolio-thumbnails.component';
import { ThumbnailsSliderComponent } from './thumbnails-slider/thumbnails-slider.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MasonryGalleryDownComponent } from './masonry-gallery-down/masonry-gallery-down.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MasonryGalleryAcrossComponent,
    PortfolioThumbnailsComponent,
    ThumbnailsSliderComponent,
    MasonryGalleryDownComponent,
    ImageSliderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
