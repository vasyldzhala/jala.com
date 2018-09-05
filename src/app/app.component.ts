import {Component, OnInit} from '@angular/core';
import {BatabaseService} from './batabase.service';

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

 constructor(private db: BatabaseService) {}

  ngOnInit() {
    this.db.getDataBase();
  }

}
