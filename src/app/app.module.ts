import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MasonryGalleryAcrossComponent } from './masonry-gallery-across/masonry-gallery-across.component';
import { PortfolioThumbnailsComponent } from './portfolio-thumbnails/portfolio-thumbnails.component';
import { ThumbnailsSliderComponent } from './thumbnails-slider/thumbnails-slider.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MasonryGalleryDownComponent } from './masonry-gallery-down/masonry-gallery-down.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import {HttpModule} from '@angular/http';
import {BatabaseService} from './batabase.service';
import { MainPageComponent } from './main-page/main-page.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import {AppRoutingModule} from './app-routing.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { PortfolioAlbumComponent } from './portfolio-album/portfolio-album.component';
import { SliderPageComponent } from './slider-page/slider-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MasonryGalleryAcrossComponent,
    PortfolioThumbnailsComponent,
    ThumbnailsSliderComponent,
    MasonryGalleryDownComponent,
    ImageSliderComponent,
    MainPageComponent,
    MainFooterComponent,
    PortfolioPageComponent,
    AboutPageComponent,
    PortfolioAlbumComponent,
    SliderPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [BatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
