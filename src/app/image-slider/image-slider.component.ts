import {
  Component, Input, OnChanges, SimpleChanges, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList,
  AfterViewChecked, OnInit
} from '@angular/core';
import {PRIMARY_OUTLET, Router} from '@angular/router';

interface Thumbnail {
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnChanges, OnInit, AfterViewChecked  {

  private thumbnailsToShow: Thumbnail[] = [];
  private thumbnailsToShowFiltered: Thumbnail[] = [];
  private isLoaded: boolean[];
  private isScrolled = false;
  private areImagesAdded = false;
  private images: Array<ElementRef>;
  private currentImageIdx = undefined;
  private routerLink = [];

  constructor(private rend: Renderer2, private router: Router) {}

  @Input() thumbnails: Thumbnail[];
  @Input() imageId: number = undefined;
  @Input() itemsNumber: number = 10;
  @ViewChild('sliderContainer') sliderContainer: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('sliderImage') sliderImage: ElementRef;
  @ViewChildren('thumbnailImg') thumbnailImgs: QueryList<ElementRef>;

  ngOnChanges(changes: SimpleChanges) {
    this.areImagesAdded = true;
    this.isLoaded = new Array(this.thumbnails.length);
    this.isLoaded.fill(true);
    if (this.thumbnailsToShow.length > this.itemsNumber) {
      this.itemsNumber = this.thumbnailsToShow.length;
    }
    this.thumbnailsToShow = this.thumbnails.slice(0, this.itemsNumber);
    this.onThumbnailsAddRemove();
  }

  ngOnInit() {
    const urlSeg = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments;
    this.routerLink = ['/', ...urlSeg.map(item => item.path)];
  }

  ngAfterViewChecked() {
    if (this.areImagesAdded) {
      this.images = this.thumbnailImgs.toArray();
      this.areImagesAdded = false;
      this.currentImageIdx = this.getImageIdxById(this.imageId);
      if (this.images[this.currentImageIdx]) {
        this.rend.setAttribute(this.sliderImage.nativeElement,
          'src',
          this.thumbnailsToShowFiltered[this.currentImageIdx].url);
          setTimeout(() => { this.scrollThumbnails(); }, 100);
      }
    }
  }

  getImageIdxById(imageId) {
    if (!imageId) { return 0; }
    for (let i = 0; i < this.images.length; i++) {
      if ( +this.images[i].nativeElement.id === imageId ) { return i; }
    }
    // const image = this.images.find(item => (+item.nativeElement.id === imageId));
    // return this.images.indexOf( image );
  }

  getNextImageId(step) {
    let nextIdx = this.currentImageIdx + step;
    if ( nextIdx >= this.images.length ) { nextIdx = 0; }
    if ( nextIdx < 0 ) { nextIdx = this.images.length - 1; }
    this.currentImageIdx = this.getImageIdxById(this.imageId);
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

  scrollSliderX(x) {
    const routerLink = this.setRouterLink(this.getNextImageId(x));
    this.router.navigate(routerLink);
    // this.currentImageIdx = x > 0 ? this.currentImageIdx + 1 : this.currentImageIdx - 1;
    // if (this.currentImageIdx < 0) { this.currentImageIdx = 0; }
    // if (this.currentImageIdx > this.images.length - 1) { this.currentImageIdx = this.images.length - 1; }
    this.scrollThumbnails();
    this.onSliderScroll();
  }

  scrollThumbnails() {
    this.images[this.currentImageIdx].nativeElement.scrollIntoView({block: 'start', behavior: 'smooth'});
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
