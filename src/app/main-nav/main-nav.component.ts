import {AfterViewChecked, Component, HostListener, Inject, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";
import {ScrollService} from "../scroll.service";
import {RoutingService} from "../routing.service";
import {BatabaseService} from "../batabase.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit, AfterViewChecked {
  windowIsScrolled: boolean = false;
  windowIsScrolled2: boolean = false;
  navbarIsFixed: boolean = false;
  navOn: boolean = false;
  isMainPlaceholder = true;
  scrollApp = false;
  routerLink = [];
  breadCrumbs = [];

  constructor(private rend: Renderer2,
              private router: Router,
              private route: ActivatedRoute,
              private routing: RoutingService,
              private scroll: ScrollService,
              private db: BatabaseService) { }

  ngOnInit() {
    document.querySelector('#scrollToApp').addEventListener('click', () => {
      this.scroll.scrollToApp();
      return false;
    });

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (this.router.url !== '/') {
          this.routerLink = this.routing.getRouterLink();
          this.breadCrumbs = [];
          this.breadCrumbs[0] = {};
          this.breadCrumbs[0].str = this.routerLink[1];
          if (this.routerLink.length > 2) {
            this.breadCrumbs[0].link = [this.routerLink[1]];
            this.breadCrumbs[1] = {};
            this.breadCrumbs[1].link = [this.routerLink[1], +this.routerLink[2]];
            if (this.db.isDataLoaded) {
              this.breadCrumbs[1].str = this.db.getNameById(this.db[this.routerLink[1]], +this.routerLink[2]);
            } else {
              this.db.dbRequest$.subscribe(
                () => {
                  this.breadCrumbs[1].str = this.db.getNameById(this.db[this.routerLink[1]], +this.routerLink[2]);
                });
            }
          }
        } else {
          this.routerLink = ['/'];
          this.breadCrumbs = [];
        }
      }

      if (this.scroll.haveToScrollToApp && (evt instanceof NavigationEnd)) {
        this.scroll.haveToScrollToApp = false;
        this.scrollApp = true;
      }
    });

  }

  ngAfterViewChecked() {
    if (this.scrollApp) {
      this.scrollApp = false;
      setTimeout(() => this.scroll.scrollToApp(), 1000);
    }
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
    // window.scroll(0, -window.innerHeight);
  }

  navigateAndScrollApp() {
    this.toggleNav();
    this.scroll.haveToScrollToApp = true;
  }

  navigateHome() {
    this.navOn = false;
    if (this.router.url === '/') {
      this.scroll.scrollToApp();
    } else {
      this.scroll.haveToScrollToApp = true;
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:scroll') onScroll() {
    // let navTogglePoint = this.isMainPlaceholder ? window.innerHeight : 100;
    let navTogglePoint = window.innerHeight + 40;
    let upButtonTogglePoint = window.innerHeight * 1.5;
    let windowScroll = window.pageYOffset;

    if (windowScroll >= navTogglePoint) {
      if (this.isMainPlaceholder) {
        this.isMainPlaceholder = false;
        // this.hideMainPlaceholder();
      }
      this.windowIsScrolled = true;
      if (!this.navbarIsFixed && !this.scroll.haveToFixNavbar) {
        this.navbarIsFixed = true;
      }
    } else {
      this.windowIsScrolled = false;
      if (this.navbarIsFixed && !this.scroll.haveToFixNavbar) {
        if (!this.navOn) { this.navbarIsFixed = false; }
      }
    }
    if (windowScroll >= upButtonTogglePoint) {
      this.windowIsScrolled2 = true;
    } else {
      this.windowIsScrolled2 = false;
    }
  }

}


