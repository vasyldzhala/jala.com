import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BatabaseService} from '../batabase.service';
import {ScrollService} from "../scroll.service";
import {RoutingService} from "../routing.service";

@Component({
  selector: 'app-portfolio-album',
  templateUrl: './portfolio-album.component.html',
  styleUrls: ['./portfolio-album.component.css']
})
export class PortfolioAlbumComponent implements OnInit, OnDestroy {

  portfolioId: number;
  thumbnails = [];
  categoryName = '';
  routerLink = [];

  constructor(private db: BatabaseService,
              private router: Router,
              private route: ActivatedRoute,
              private scroll: ScrollService,
              private rout: RoutingService) { }

  @HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.routerLink = this.rout.getRouterLink();
        if (this.routerLink.indexOf('slider') < 0 ) { this.closeAlbum(); }
        break;
    }
  }

  ngOnInit() {
    this.routerLink = this.rout.getRouterLink();
    this.route.params.subscribe((params: Params) => {
      this.portfolioId = +params['categoryId'];

      if (this.db.isDataLoaded) {
        this.setPrVar();
      } else {
        this.db.dbRequest$.subscribe(
          () => {
            this.setPrVar();
          });
      }
    });
    this.scroll.preventWindowScrolling();
    this.scroll.fixNavbar();
  }

  ngOnDestroy() {
    this.scroll.allowWindowScrolling();
    this.scroll.unfixNavbar();
  }

  setPrVar() {
    if (this.db.categories.findIndex(item => +item.id === +this.portfolioId) >= 0 ) {
      this.thumbnails = this.db.images.filter(item => ((item.isPortfolio > 0) && +item.categoryId === +this.portfolioId)); // ));
      this.categoryName = this.getCategoryNameById(this.portfolioId);
    } else {
      console.log(`Error! Can't find categoryId = ${this.portfolioId}`);
      this.router.navigate(['/portfolio']);
    }
  }

  closeAlbum() {
    this.router.navigate(this.routerLink.slice(0, this.routerLink.indexOf('portfolio')+1));
  }

  getCategoryNameById(categoryId) {
//    return this.db.categories.find( item => (+item.id === +categoryId));
    const idx = this.db.categories.findIndex(item => +item.id === +categoryId);
    return ( idx >= 0) ? this.db.categories[idx].name : undefined;
  }

}
