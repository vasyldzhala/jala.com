import {
  Component, Input, OnChanges, SimpleChanges, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList,
  AfterViewChecked, OnInit, HostListener, OnDestroy
} from '@angular/core';
import {PRIMARY_OUTLET, Router} from '@angular/router';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import {ScrollService} from "../scroll.service";
import {RoutingService} from "../routing.service";

interface Thumbnail {
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  animations: [
    trigger('sliderState', [
      state('withThumbnails', style({ height: '86vh', paddingTop: '10px' })),
      state('fullScreen',   style({ height: '100vh', paddingTop: '0' })),
      transition('withThumbnails <=> fullScreen', animate('200ms ease'))
    ]),
    trigger('sliderImageState', [
      state('in', style({opacity: '1'})),
      state('out', style({opacity: '0.5'})),
      transition('in <=> out', animate('100ms ease')),
    ]),
    trigger('sliderThumbnailState', [
      state('in', style({opacity: '0.3'})),
      state('out', style({opacity: '1'})),
      transition('in <=> out', animate('100ms ease')),
    ])
  ]
})
export class ImageSliderComponent implements OnChanges, OnInit, AfterViewChecked, OnDestroy  {

  thumbnailsToShow: Thumbnail[] = [];
  thumbnailsToShowFiltered: Thumbnail[] = [];
  private isLoaded: boolean[];
  private isScrolled = false;
  private areImagesAdded = false;
  private images: Array<ElementRef>;
  private currentImageIdx = undefined;
  private routerLink = [];
  sliderState = 'withThumbnails';
  sliderImageState = 'out';
  private sliderAnimationTime = 100;

  constructor(private rend: Renderer2,
              private router: Router,
              private scroll: ScrollService,
              private rout: RoutingService) {}

  @Input() thumbnails: Thumbnail[];
  @Input() imageId: number = undefined;
  @Input() itemsNumber: number = 10;
  @ViewChild('sliderContainer') sliderContainer: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('sliderImage') sliderImage: ElementRef;
  @ViewChild('containerSliderImage') containerSliderImage: ElementRef;
  @ViewChildren('thumbnailImg') thumbnailImgs: QueryList<ElementRef>;

  @HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.closeSlider();
        break;
      case 'ArrowRight':
        this.scrollSliderX(1);
        break;
      case 'ArrowLeft':
        this.scrollSliderX(-1);
        break;
      case 'f': case 'а':
        this.toggleSliderState();
        break;
    }
  }

  @HostListener('window:resize') onResize() {
    setTimeout(() => {
      this.setImageSize();
      this.scrollThumbnails();
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.areImagesAdded = true;
    this.sliderImageState = 'out';
    this.isLoaded = new Array(this.thumbnails.length);
    this.isLoaded.fill(true);
    if (this.thumbnailsToShow.length > this.itemsNumber) {
      this.itemsNumber = this.thumbnailsToShow.length;
    }
    this.thumbnailsToShow = this.thumbnails.slice(0, this.itemsNumber);
    this.onThumbnailsAddRemove();
  }

  ngOnInit() {
    this.routerLink = this.rout.getRouterLink();
    this.scroll.preventWindowScrolling();
  }

  ngAfterViewChecked() {
    if (this.areImagesAdded) {
      this.images = this.thumbnailImgs.toArray();
      this.areImagesAdded = false;
      this.currentImageIdx = this.getImageIdxById(this.imageId);
      if (this.images[this.currentImageIdx]) {
        this.setImageSize();
        setTimeout(() => { this.scrollThumbnails(); }, 100);
      }
    }
  }

  ngOnDestroy() {
    // this.scroll.allowWindowScrolling();
  }

  setImageSize() {
    const image = new Image();
    const cont = this.containerSliderImage.nativeElement;
    let marg;
    (window.innerWidth < 1025) ? marg = 4 : marg = 80;
    let imageSizeRatio = 1;
    image.src = this.thumbnailsToShowFiltered[this.currentImageIdx].url;
    Observable.fromEvent(image, 'load').subscribe(() => {
      ( (image.naturalWidth / image.naturalHeight) < (cont.clientWidth / cont.clientHeight) ) ?
        imageSizeRatio = cont.clientHeight / image.naturalHeight :
        imageSizeRatio = cont.clientWidth / image.naturalWidth;
      this.rend.setStyle(this.sliderImage.nativeElement,
        'height',
        `${image.naturalHeight * imageSizeRatio - marg}px`);
      this.rend.setAttribute(this.sliderImage.nativeElement,
        'src',
        this.thumbnailsToShowFiltered[this.currentImageIdx].url);
      this.sliderImageState = 'in';
    });
  }

  getImageIdxById(imageId) {
    if (!imageId) { return 0; }
    for (let i = 0; i < this.images.length; i++) {
      if ( +this.images[i].nativeElement.id === imageId ) { return i; }
      if ( i === this.images.length - 1 ) {
        console.log(`Error! Can't find image with id = ${imageId}`);
        this.closeSlider();
      }
    }
    // const image = this.images.find(item => (+item.nativeElement.id === imageId));
    // return this.images.indexOf( image );
  }

  getNextImageId(step) {
    let nextIdx = this.currentImageIdx + step;
    if ( nextIdx >= this.images.length ) { nextIdx = 0; }
    if ( nextIdx < 0 ) { nextIdx = this.images.length - 1; }
    return this.images[nextIdx].nativeElement.id;
  }

  setRouterLink(imageId) {
    let rout = this.routerLink;
    rout[rout.indexOf('slider') + 1] = imageId.toString();
    return rout;
  }

  onError(thumbnail: Thumbnail) {
    console.log('Load image error!', thumbnail);
    this.isLoaded[this.thumbnailsToShow.indexOf(thumbnail)] = false;
    this.onThumbnailsAddRemove();
  }

  onThumbnailsAddRemove() {
    this.thumbnailsToShowFiltered = this.thumbnailsToShow.filter((el, index) => this.isLoaded[index]);
    this.areImagesAdded = true;
  }

  closeSlider() {
    this.router.navigate(this.routerLink.slice(0, this.routerLink.indexOf('slider')));
  }

  toggleSliderState() {
    this.sliderState = this.sliderState === 'withThumbnails' ? 'fullScreen' : 'withThumbnails';
    setTimeout(() => this.setImageSize(), this.sliderAnimationTime * 2);
  }

  scrollSliderX(x) {
    const routerLink = this.setRouterLink(this.getNextImageId(x));
    this.sliderImageState = 'out';
    setTimeout(() => {
        this.router.navigate(routerLink);
        this.scrollThumbnails();
        this.onSliderScroll();
      },
      this.sliderAnimationTime);
  }

  moveSliderImage(imageId) {
    this.sliderImageState = 'out';
    setTimeout(
      () => this.router.navigate(this.setRouterLink(imageId)),
      this.sliderAnimationTime
    );
  }

  scrollThumbnails() {
    this.images[this.currentImageIdx].nativeElement.scrollIntoView({behavior: 'smooth'});
    this.onSliderScroll();
  }

  onSliderScroll() {
    if (!this.isScrolled && this.thumbnailsToShow.length < this.thumbnails.length) {
      let scrollPoz = this.slider.nativeElement.scrollWidth - this.sliderContainer.nativeElement.scrollLeft
        - this.sliderContainer.nativeElement.clientWidth;
      if (scrollPoz < 50) {
        this.isScrolled = true;
        this.thumbnailsToShow = this.thumbnailsToShow
          .concat(this.thumbnails.slice(this.thumbnailsToShow.length, this.thumbnailsToShow.length + this.itemsNumber));
        this.onThumbnailsAddRemove();
      }
      setTimeout(() => this.isScrolled = false, 1000);
    }
  }
}
