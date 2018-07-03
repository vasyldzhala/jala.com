import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  thumbnails = [
    { id: 1, name: 'img 1', url: 'https://picsum.photos/200/300/?random' },
    { id: 2, name: 'img 2', url: 'https://picsumtt.photos/300/200/?random' },
    { id: 3, name: 'img 3', url: 'https://picsum.photos/300/200/?random' },
    { id: 4, name: 'img 4', url: 'https://picsum.photos/200/300/?random' },
    { id: 5, name: 'img 5', url: 'https://picsum.photos/200/200/?random' },
    { id: 6, name: 'img 6', url: 'https://picsum.photos/200/200/?random' },
    { id: 7, name: 'img 7', url: 'https://picsum.photos/200/300/?random' },
    { id: 8, name: 'img 8', url: 'https://picsum.photos/200/300/?random' },
    { id: 9, name: 'img 9', url: 'https://picsum.photos/300/200/?random' },
    { id: 10, name: 'img 10', url: 'https://picsum.photos/300/200/?random' },
    { id: 11, name: 'img 11', url: 'https://picsum.photos/200/300/?random' },
    { id: 12, name: 'img 12', url: 'https://picsum.photos/200/200/?random' },
    { id: 13, name: 'img 13', url: 'https://picsum.photos/200/200/?random' },
    { id: 14, name: 'img 14', url: 'https://picsum.photos/200/300/?random' },
    { id: 15, name: 'img 15', url: 'https://picsum.photos/200/300/?random' },
    { id: 16, name: 'img 16', url: 'https://picsum.photos/200/300/?random' },
    { id: 17, name: 'img 17', url: 'https://picsum.photos/200/300/?random' },
    { id: 18, name: 'img 18', url: 'https://picsum.photos/300/200/?random' },
    { id: 19, name: 'img 19', url: 'https://picsum.photos/300/200/?random' },
    { id: 20, name: 'img 20', url: 'https://picsum.photos/200/300/?random' },
    { id: 21, name: 'img 5', url: 'https://picsum.photos/200/200/?random' },
    { id: 22, name: 'img 6', url: 'https://picsum.photos/200/200/?random' },
    { id: 23, name: 'img 7', url: 'https://picsum.photos/200/300/?random' },
    { id: 24, name: 'img 1', url: 'https://picsum.photos/200/300/?random' },
    { id: 25, name: 'img 2', url: 'https://picsum.photos/300/200/?random' },
    { id: 26, name: 'img 3', url: 'https://picsum.photos/300/200/?random' },
    { id: 27, name: 'img 4', url: 'https://picsum.photos/200/300/?random' },
    { id: 28, name: 'img 5', url: 'https://picsum.photos/200/200/?random' },
    { id: 29, name: 'img 6', url: 'https://picsum.photos/200/200/?random' },
    { id: 30, name: 'img 7', url: 'https://picsum.photos/200/300/?random' },
    { id: 31, name: 'img 1', url: 'https://picsum.photos/200/300/?random' },
    { id: 32, name: 'img 1', url: 'https://picsum.photos/200/300/?random' },
    { id: 33, name: 'img 1', url: 'https://picsum.photos/200/300/?random' },
    { id: 34, name: 'img 2', url: 'https://picsum.photos/300/200/?random' },
    { id: 35, name: 'img 3', url: 'https://picsum11.photos/300/200/?random' },
    { id: 36, name: 'img 4', url: 'https://picsum.photos/200/300/?random' },
    { id: 37, name: 'img 5', url: 'https://picsum.photos/200/200/?random' },
    { id: 38, name: 'img 6', url: 'https://picsum.photos/200/200/?random' },
    { id: 39, name: 'img 7', url: 'https://picsum.photos/200/300/?random' },
    { id: 40, name: 'img 1', url: 'https://picsum.photos/200/300/?random' },
    { id: 41, name: 'img 2', url: 'https://picsum.photos/300/200/?random' },
    { id: 42, name: 'img 3', url: 'https://picsum.photos/300/200/?random' },
    { id: 43, name: 'img 4', url: 'https://picsum.photos/200/300/?random' },
    { id: 44, name: 'img 5', url: 'https://picsum.photos/200/200/?random' },
    { id: 45, name: 'img 6', url: 'https://picsum.photos/200/200/?random' },
    { id: 46, name: 'img 7', url: 'https://picsum.photos/200/300/?random' },
    { id: 47, name: 'img 1', url: 'https://picsum.photos/200/300/?random' },
    { id: 48, name: 'img 1', url: 'https://picsum.photos/200/300/?random' }
  ];

  portfolio = [
    { id: 1, name: 'Landscapes', url: 'https://picsum.photos/200/200/?random' },
    { id: 2, name: 'Portraits', url: 'https://picsum.photos/201/201/?random' },
    { id: 3, name: 'Nature', url: 'https://picsum.photos/202/202/?random' },
    { id: 4, name: 'Urban', url: 'https://picsum.photos/203/203/?random' },
    { id: 5, name: 'Streets', url: 'https://picsum.photos/204/204/?random' },
    { id: 6, name: 'Patterns', url: 'https://picsum.photos/205/205/?random' }
  ];

  thumbnails1 = this.thumbnails.slice(0, 20);


  myMessage = 'My Massage';
  ngOnInit() {}

  private cutThumbnails() {
    this.thumbnails = this.thumbnails.slice(0, 15);
  }
}
