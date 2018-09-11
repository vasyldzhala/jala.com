import { Component, OnInit } from '@angular/core';
import {ScrollService} from '../scroll.service';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {

  constructor(private scroll: ScrollService) { }

  ngOnInit() {
  }

  scrollToApp() {
    this.scroll.haveToScrollToApp = true;
  }

}
