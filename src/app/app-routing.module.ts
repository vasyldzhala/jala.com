import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {PortfolioPageComponent} from './portfolio-page/portfolio-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {PortfolioAlbumComponent} from './portfolio-album/portfolio-album.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent,
    children: [
      { path: ':categoryId', component: PortfolioAlbumComponent }
    ]
},
  { path: 'about', component: AboutPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
