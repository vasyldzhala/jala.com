import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {PortfolioPageComponent} from './portfolio-page/portfolio-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {PortfolioAlbumComponent} from './portfolio-album/portfolio-album.component';
import {SliderPageComponent} from './slider-page/slider-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {AlbumsPageComponent} from './albums-page/albums-page.component';
import {AlbumGalleryPageComponent} from './album-gallery-page/album-gallery-page.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent,
    children: [
      { path: ':categoryId', component: PortfolioAlbumComponent,
        children: [
          { path: 'slider/:imageId', component: SliderPageComponent }
        ]
      }
    ]
  },
  { path: 'albums', component: AlbumsPageComponent
    ,
    children: [
      { path: ':albumId', component: AlbumGalleryPageComponent,
        children: [
          { path: 'slider/:imageId', component: SliderPageComponent }
        ]
      }
    ]
  },
  { path: 'about', component: AboutPageComponent },
  { path: '**' , component: NotFoundPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
