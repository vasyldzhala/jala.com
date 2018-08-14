import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BatabaseService} from '../batabase.service';

@Component({
  selector: 'app-portfolio-album',
  templateUrl: './portfolio-album.component.html',
  styleUrls: ['./portfolio-album.component.css']
})
export class PortfolioAlbumComponent implements OnInit {

  portfolioId: number;
  thumbnails = [];
  categoryName = '';

  constructor(private db: BatabaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.portfolioId = +params['categoryId'];

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
    this.thumbnails = this.db.images.filter(item => (item.isPortfolio && +item.categoryId === +this.portfolioId)); // ));
    this.categoryName = this.getCategoryById(this.portfolioId).name;
  }

  getCategoryById(categoryId) {
    return this.db.categories.find( item => (+item.id === +categoryId));
  }

}
