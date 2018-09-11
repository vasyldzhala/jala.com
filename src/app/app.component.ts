import {Component, OnInit} from '@angular/core';
import {BatabaseService} from './batabase.service';
import {ActivatedRoute, Params, Router} from "@angular/router";

interface Image {
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 constructor(private db: BatabaseService,
             private route: ActivatedRoute,
             private router: Router) {}

  ngOnInit() {
    this.db.getDataBase();
  }

}
