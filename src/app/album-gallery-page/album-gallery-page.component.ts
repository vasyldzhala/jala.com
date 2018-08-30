import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BatabaseService} from '../batabase.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ScrollService} from "../scroll.service";
import {RoutingService} from "../routing.service";

@Component({
  selector: 'app-album-gallery-page',
  templateUrl: './album-gallery-page.component.html',
  styleUrls: ['./album-gallery-page.component.css']
})
export class AlbumGalleryPageComponent implements OnInit, OnDestroy {

  albumId: number = undefined;
  thumbnails = [];
  albumName = '';
  routerLink = [];
  isScrolled = false;


  constructor(private  db: BatabaseService,
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
      this.albumId = +params['albumId'];
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
    if (this.db.albums.findIndex(item => +item.id === +this.albumId) >= 0 ) {
      this.thumbnails = this.db.images.filter(item => (item.isPortfolio && +item.albumId === +this.albumId)); // ));
      this.albumName = this.getAlbumNameById(this.albumId);
    } else {
      console.log(`Error! Can't find album Id = ${this.albumId}`);
      this.router.navigate(['/albums']);
    }
  }

  closeAlbum() {
    this.router.navigate(this.routerLink.slice(0, this.routerLink.indexOf('albums')+1));
  }

  getAlbumNameById(id) {
    const idx = this.db.albums.findIndex(item => +item.id === +id);
    return ( idx >= 0) ? this.db.albums[idx].name : undefined;
  }

}
