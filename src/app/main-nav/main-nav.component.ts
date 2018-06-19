import {Component, HostListener, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  windowIsScrolled: boolean = false;
  navbarIsFixed: boolean = false;
  navOn: boolean = false;

  constructor() { }
  ngOnInit() {
  }
  toggleNav() {
    this.navOn = !this.navOn;
    if (this.navOn) { this.navbarIsFixed = true; }
    if (!this.navOn && !this.windowIsScrolled) { this.navbarIsFixed = false; }
  }

  @HostListener('window:scroll') onScroll() {
    let screenHeight = screen.height;
    let windowScroll = window.pageYOffset;

    if (windowScroll >= screenHeight) {
      this.windowIsScrolled = true;
      if (!this.navbarIsFixed) {
        this.navbarIsFixed = true;
      }
    } else {
      this.windowIsScrolled = false;
      if (this.navbarIsFixed) {
        if (!this.navOn) { this.navbarIsFixed = false; }
      }
    }
  }

}


