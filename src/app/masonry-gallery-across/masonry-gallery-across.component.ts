import {
  AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild,
  ViewChildren, HostListener, SimpleChanges, OnChanges
} from '@angular/core';
import {Observable} from 'rxjs/Observable';

interface Thumbnail {
  id: number;
  name: string;
  url: string;
  imgRatio: number;
  isLoaded: boolean;
}
@Component({
  selector: 'app-masonry-gallery-across',
  templateUrl: './masonry-gallery-across.component.html',
  styleUrls: ['./masonry-gallery-across.component.css']
})

export class MasonryGalleryAcrossComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {

  private thumbnailsToShow: Thumbnail[] = [];
  private timeGap = 500;
  private areImagesLoaded = false;
  private isResized = false;
  private isScrolledNow = false;
  private images: Array<ElementRef>;
  private contPadding: number;
  private itemShellAcross: number;
  private itemPaddingBorderDown: number;

  constructor(private rend: Renderer2) { }

  @Input() thumbnails: Thumbnail[];
  @Input() itemsNumber = 10;
  @Input() maxRowH = 300;
  @ViewChild('masonryGallery') cont: ElementRef;
  @ViewChildren('galleryImg') imgs: QueryList<ElementRef>;
  trackByImgId(index: number, thumbnail: any) { return thumbnail.id; }

  ngOnChanges(changes: SimpleChanges) {
    this.thumbnailsToShow = [];
    this.loadImages(this.thumbnails.slice(0, this.itemsNumber));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    if (this.areImagesLoaded) {
      this.images = this.imgs.toArray();
      this.contPadding = this.getContPadding(this.cont);
      this.itemShellAcross = this.getItemPaddingMargin(this.images[0]);
      this.itemPaddingBorderDown = this.getItemPaddingBorder(this.images[0]);
      this.alignGallery();
      this.areImagesLoaded = false;
    }
  }

  @HostListener('window:resize') onResize() {
    if (!this.isResized) {
      this.isResized = true;
      Observable.of('')
        .delay(this.timeGap)
        .subscribe(x =>
          {
            this.alignGallery();
            this.isResized = false;
          }
        );
    }
  }

  @HostListener('window:scroll') onScroll() {
    let contPos = this.cont.nativeElement.getBoundingClientRect().bottom;
    if (!this.isScrolledNow && this.thumbnailsToShow.length > 0
      && this.thumbnailsToShow < this.thumbnails && contPos <= window.innerHeight) {
      this.isScrolledNow = true;
      Observable.of('').delay(this.timeGap)
        .subscribe( x => {
          this.loadImages(this.thumbnails.slice(this.thumbnailsToShow.length,
            this.thumbnailsToShow.length + this.itemsNumber));
          this.isScrolledNow = false;
        });
    }
  }

  private loadImages(items: Thumbnail[]) {
    let img = [];
    let isLoaded = [];
    let loadEvents$: Observable<any>[] = [];
    for (let i = 0; i < items.length; i++) {
      img[i] = new Image();
      img[i].src = items[i].url;
      loadEvents$[i] = Observable
        .if( () => (img[i].naturalWidth > 0),
          Observable.of('loaded'),
          Observable.merge(
            Observable.fromEvent(img[i], 'load'),
            Observable.fromEvent(img[i], 'error'),
            Observable.of('timeout').delay(10000)
          )
        ).take(1);
    }
    Observable.zip(...loadEvents$)
      .subscribe((data) => {
          isLoaded = data.map((x) => {
            return (x === 'loaded' || x.type === 'load') ? true : false;
          });
          this.thumbnailsToShow = this.thumbnailsToShow.concat(items
            .map((item: Thumbnail, idx: number) => {
              if (isLoaded[idx]) { item.imgRatio = img[idx].naturalWidth / img[idx].naturalHeight; }
              item.isLoaded = isLoaded[idx];
              return item;
            })
          );
          if (this.thumbnailsToShow.length > 0) { this.areImagesLoaded = true; }
        },
        (error) => {
          console.log('Images are loaded with errors!', error);
        }
      );
  }

  private getContPadding(cont: ElementRef) {
    const contStyle = window.getComputedStyle(cont.nativeElement, null);
    return parseFloat(contStyle.getPropertyValue('padding-left')) + parseFloat(contStyle.getPropertyValue('padding-right'));
  }

  private getItemPaddingMargin(item: ElementRef) {
    const itemStyle = window.getComputedStyle(item.nativeElement, null);
    let itemPaddingMargin = parseFloat(itemStyle.getPropertyValue('padding-left'));
    itemPaddingMargin += parseFloat(itemStyle.getPropertyValue('padding-right'));
    itemPaddingMargin += parseFloat(itemStyle.getPropertyValue('margin-left'));
    itemPaddingMargin += parseFloat(itemStyle.getPropertyValue('margin-right'));
    itemPaddingMargin += parseFloat(itemStyle.getPropertyValue('border-width')) * 2;
    return itemPaddingMargin;
  }

  private getItemPaddingBorder(item: ElementRef) {
    const itemStyle = window.getComputedStyle(item.nativeElement, null);
    let itemPaddingBorder = parseFloat(itemStyle.getPropertyValue('padding-top'));
    itemPaddingBorder += parseFloat(itemStyle.getPropertyValue('padding-bottom'));
    itemPaddingBorder += parseFloat(itemStyle.getPropertyValue('border-width')) * 2;
    return itemPaddingBorder;
  }

  private alignGallery() {

    let thumbnailsToShowFiltered = this.thumbnailsToShow.filter(item =>  item.isLoaded);

    let contW = this.cont.nativeElement.clientWidth - this.contPadding;
    let startItemInd = 0;
    let itemNum, summK, ind, rowH;

    do {
      itemNum = 0;
      summK = 0;
      ind = startItemInd;
      do {
        itemNum++;
        summK += thumbnailsToShowFiltered[ind].imgRatio;
        rowH = ( contW - this.itemShellAcross * itemNum ) / summK + this.itemPaddingBorderDown;
        ind++;
      } while (rowH > this.maxRowH && ind < this.images.length);

      if (rowH > this.maxRowH * 1.5) { rowH = this.maxRowH; }

      for (let i = startItemInd; i < ind; i++) {
        this.rend.setStyle(this.images[i].nativeElement, 'height', `${rowH}px`);
        this.rend.setAttribute(this.images[i].nativeElement, 'src', thumbnailsToShowFiltered[i].url);
        this.rend.setStyle(this.images[i].nativeElement, 'opacity', `1`);
      }
      startItemInd = ind;
    } while (ind < this.images.length);
  }


}
