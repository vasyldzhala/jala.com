import {
  Component, Input, OnChanges, OnInit, SimpleChanges, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList,
  AfterViewChecked
} from '@angular/core';
import {Observable} from "rxjs/Observable";

interface Thumbnail {
  id: number;
  name: string;
  url: string;
  imgRatio: number;
  isLoaded: boolean;
}

@Component({
  selector: 'app-thumbnails-slider',
  templateUrl: './thumbnails-slider.component.html',
  styleUrls: ['./thumbnails-slider.component.css'],
})
export class ThumbnailsSliderComponent implements OnChanges, AfterViewChecked {

  private thumbnailsToShow: Thumbnail[] = [];
  private isScrolled = false;
  private areImagesAdded = false;
  private images: Array<ElementRef>;
  private cuttentImageIdx = 1;

  constructor(private rend: Renderer2) {}

  @Input() thumbnails: Thumbnail[];
  @Input() itemsNumber: number = 10;
  @Input() imageHeight: number = 300;
  @ViewChild('sliderContainer') sliderContainer: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChildren('thumbnailImg') thumbnailImgs: QueryList<ElementRef>;

  ngOnChanges(changes: SimpleChanges) {
    for (let i = 0; i < this.thumbnails.length; i++) {
      this.thumbnails[i].isLoaded = true;
    }
    this.thumbnailsToShow = this.thumbnails.slice(0, this.itemsNumber);
    this.areImagesAdded = true;
    this.cuttentImageIdx = 1;
  }

  ngAfterViewChecked() {
    if (this.areImagesAdded) {
      console.log('AfterViewChecked!');
      this.images = this.thumbnailImgs.toArray();
      this.areImagesAdded = false;
    }
  }

  scrollSliderX(x) {
    // let shift = x * this.sliderContainer.nativeElement.clientWidth + this.sliderContainer.nativeElement.scrollLeft;
    // this.rend.setProperty(this.sliderContainer.nativeElement, 'scrollLeft', `${shift}`);
    this.cuttentImageIdx = x > 0 ? this.cuttentImageIdx + 2 : this.cuttentImageIdx - 2;
    if (this.cuttentImageIdx < 0) { this.cuttentImageIdx = 0; }
    if (this.cuttentImageIdx > this.images.length - 1) { this.cuttentImageIdx = this.images.length - 1; }
    this.images[this.cuttentImageIdx].nativeElement.scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  onSliderScroll($event) {
    if (!this.isScrolled && this.thumbnailsToShow.length < this.thumbnails.length) {
      let scrollPoz = this.slider.nativeElement.scrollWidth - this.sliderContainer.nativeElement.scrollLeft
        - this.sliderContainer.nativeElement.clientWidth;
      if (scrollPoz < 10) {
        this.isScrolled = true;
        this.thumbnailsToShow = this.thumbnailsToShow
          .concat(this.thumbnails.slice(this.thumbnailsToShow.length, this.thumbnailsToShow.length + this.itemsNumber));
        this.areImagesAdded = true;
      }
      Observable.of('').delay(1000).subscribe(() => this.isScrolled = false);
    }
  }

}
