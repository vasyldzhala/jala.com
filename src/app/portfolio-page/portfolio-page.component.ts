import { Component, OnInit } from '@angular/core';
import {BatabaseService} from '../batabase.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {

  thumbnails = [];

  constructor(private db: BatabaseService) { }

  ngOnInit() {
    if (this.db.isDataLoaded) {
      this.setPrVar();
    } else {
      this.db.dbRequest$.subscribe(
        () => {
          this.setPrVar();
        });
    }
  }

  setPrVar() {
    this.thumbnails = this.db.images.filter(item => item.isPortfolio);
  }

}
