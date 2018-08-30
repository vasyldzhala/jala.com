import {Component, HostListener, Inject, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  windowIsScrolled: boolean = false;
  navbarIsFixed: boolean = false;
  navOn: boolean = false;
  isMainPlaceholder = true;

  constructor(private  rend: Renderer2 ) { }
  ngOnInit() {
  }
  toggleNav() {
    this.navOn = !this.navOn;
    if (this.navOn) { this.navbarIsFixed = true; }
    if (!this.navOn && !this.windowIsScrolled) { this.navbarIsFixed = false; }
  }
  hideMainPlaceholder() {
    const placeholder = document.querySelector('#main-placeholder');
    this.rend.setStyle(placeholder, 'display', 'none');
    // window.scrollTo(0, 0);
    window.scroll(0, -window.innerHeight);
  }

  @HostListener('window:scroll') onScroll() {
    // let navTogglePoint = this.isMainPlaceholder ? window.innerHeight : 100;
    let navTogglePoint = window.innerHeight;
    let windowScroll = window.pageYOffset;

    if (windowScroll >= navTogglePoint) {
      if (this.isMainPlaceholder) {
        this.isMainPlaceholder = false;
        // this.hideMainPlaceholder();
      }
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


