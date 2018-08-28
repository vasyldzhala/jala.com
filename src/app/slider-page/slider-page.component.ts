import { Component, OnInit } from '@angular/core';
import {BatabaseService} from '../batabase.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-slider-page',
  templateUrl: './slider-page.component.html',
  styleUrls: ['./slider-page.component.css']
})
export class SliderPageComponent implements OnInit {

  categoryId: number;
  sliderCaption: string = '';
  albumId: number;
  imageId: number;
  thumbnails = [];
  itemsNumber = 10;

  constructor(private db: BatabaseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = +this.route.snapshot.parent.params['categoryId'] || undefined;
      this.albumId = +this.route.snapshot.parent.params['albumId'] || undefined;
      this.imageId = +params['imageId'] || undefined;

      if (this.db.isDataLoaded) {
        this.setPrVar();
      } else {
        this.db.dbRequest$.subscribe(
          () => {
            this.setPrVar();
          });
      }
    });
  }

  setPrVar() {
    if (this.categoryId) {
      if (this.db.categories.findIndex(item => (+item.id === +this.categoryId)) >= 0 ) {
        this.thumbnails = this.db.images
          .filter(item => (item.isPortfolio && (+item.categoryId === +this.categoryId)));
        this.sliderCaption = 'Portfolio: ' + this.getNameById(this.db.categories, this.categoryId);
      } else {
        console.log(`Error! Can't find categoryId = ${this.categoryId}`);
        this.router.navigate(['/portfolio']);
      }
    }
    if (this.albumId) {
      if (this.db.albums.findIndex(item => (+item.id === +this.albumId))) {
        this.thumbnails = this.db.images
          .filter(item => (+item.albumId === +this.albumId));
        this.sliderCaption = 'Album: ' + this.getNameById(this.db.albums, this.albumId);
      } else {
        console.log(`Error! Can't find albumId = ${this.albumId}`);
        this.router.navigate(['/albums']);
      }
    }

    const imageName = this.getNameById(this.db.images, this.imageId);
    if ( imageName ) {
      this.sliderCaption = this.sliderCaption + ', ' + imageName;
    }

    const imageIdx = this.thumbnails.findIndex(item => (+item.id === +this.imageId));
    if (imageIdx + 1 > this.itemsNumber ) {
      this.itemsNumber = imageIdx + 1;
    }
  }

  getNameById(base: any[], id: number) {
    const idx = base.findIndex(item => +item.id === +id);
    return ( idx >= 0) ? base[idx].name : undefined;
  }
}
