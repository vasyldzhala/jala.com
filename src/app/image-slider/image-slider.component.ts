import {
  Component, Input, OnChanges, SimpleChanges, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList,
  AfterViewChecked
} from '@angular/core';

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
export class ImageSliderComponent implements OnChanges, AfterViewChecked  {

  private thumbnailsToShow: Thumbnail[] = [];
  private thumbnailsToShowFiltered: Thumbnail[] = [];
  private isLoaded: boolean[];
  private isScrolled = false;
  private areImagesAdded = false;
  private images: Array<ElementRef>;
  private currentImageIdx = 0;

  constructor(private rend: Renderer2) {}

  @Input() thumbnails: Thumbnail[];
  @Input() itemsNumber: number = 10;
  @Input() imageHeight: number = 300;
  @ViewChild('sliderContainer') sliderContainer: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChildren('thumbnailImg') thumbnailImgs: QueryList<ElementRef>;

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges!', changes);
    this.isLoaded = new Array(this.thumbnails.length);
    this.isLoaded.fill(true);
    this.thumbnailsToShow = this.thumbnails.slice(0, this.itemsNumber);
    this.onThumbnailsAddRemove();
    this.currentImageIdx = 0;
  }

  ngAfterViewChecked() {
    if (this.areImagesAdded) {
      this.images = this.thumbnailImgs.toArray();
      this.areImagesAdded = false;
    }
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

  scrollSliderX(x) {
    this.currentImageIdx = x > 0 ? this.currentImageIdx + 1 : this.currentImageIdx - 1;
    if (this.currentImageIdx < 0) { this.currentImageIdx = 0; }
    if (this.currentImageIdx > this.images.length - 1) { this.currentImageIdx = this.images.length - 1; }
    this.images[this.currentImageIdx].nativeElement.scrollIntoView({block: 'start', behavior: 'smooth'});
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
