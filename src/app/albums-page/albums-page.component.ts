import { Component, OnInit } from '@angular/core';
import {BatabaseService} from "../batabase.service";

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.css']
})
export class AlbumsPageComponent implements OnInit {

  albums = [];

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
    this.albums = this.db.albums;
  }
}
