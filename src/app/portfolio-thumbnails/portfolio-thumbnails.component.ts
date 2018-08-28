import {Component, Input, OnInit} from '@angular/core';

interface Album {
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-portfolio-thumbnails',
  templateUrl: './portfolio-thumbnails.component.html',
  styleUrls: ['./portfolio-thumbnails.component.css']
})
export class PortfolioThumbnailsComponent implements OnInit {

  constructor() { }

  @Input() portfolio: Album[];

  ngOnInit() {
  }

  scroll(element) {
    setTimeout(() => {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, 2000);
  }

}
