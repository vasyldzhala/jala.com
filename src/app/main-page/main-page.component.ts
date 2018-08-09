import { Component, OnInit } from '@angular/core';
import {BatabaseService} from '../batabase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  thumbnails = [];
  albums = [];
  portfolio = [];

  constructor(private db: BatabaseService) {}

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
    this.thumbnails = this.db.images;
    this.albums = this.db.albums;
    this.portfolio = this.db.portfolio;
  }



}
