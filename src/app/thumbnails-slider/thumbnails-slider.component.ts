import {
  Component, Input, OnChanges, SimpleChanges, Renderer2, ViewChild, ElementRef
} from '@angular/core';

interface Thumbnail {
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-thumbnails-slider',
  templateUrl: './thumbnails-slider.component.html',
  styleUrls: ['./thumbnails-slider.component.css'],
})
export class ThumbnailsSliderComponent implements OnChanges {

  private thumbnailsToShow: Thumbnail[] = [];
  private isLoaded: boolean[];
  private isScrolled = false;
  private areImagesAdded = false;
  private currentImageIdx = 1;

  constructor(private rend: Renderer2) {}

  @Input() thumbnails: Thumbnail[];
  @Input() itemsNumber: number = 10;
  @Input() imageHeight: number = 300;
  @ViewChild('sliderContainer') sliderContainer: ElementRef;
  @ViewChild('slider') slider: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges!', changes);
    this.isLoaded = new Array(this.thumbnails.length);
    this.isLoaded.fill(true);
    this.thumbnailsToShow = this.thumbnails.slice(0, this.itemsNumber);
    this.areImagesAdded = true;
    this.currentImageIdx = 1;
  }

  onError(thumbnail: Thumbnail) {
    console.log('Load image error!', thumbnail);
    this.isLoaded[this.thumbnailsToShow.indexOf(thumbnail)] = false;
  }

  scrollSliderX(x, frames = 20) {
    // Version with requestAnimationFrame using ****************
    let shift: number, repl: number;
    let i = 0;
    const elem = this.sliderContainer.nativeElement;
    shift = elem.scrollLeft;
    repl = x * elem.clientWidth / frames;

    const scrollX = () => {
      shift += repl;
      if (i++ <= frames) {
        requestAnimationFrame(scrollX);
        this.rend.setProperty(elem, 'scrollLeft', `${shift}`);
      }
    };

    scrollX();

    // Version without smooth scrolling ***************
    // let shift = x * this.sliderContainer.nativeElement.clientWidth + this.sliderContainer.nativeElement.scrollLeft;
    // this.rend.setProperty(this.sliderContainer.nativeElement, 'scrollLeft', `${shift}`);

    //  Version with scrollIntoView *****************
    // this.currentImageIdx = x > 0 ? this.currentImageIdx + 2 : this.currentImageIdx - 2;
    // if (this.currentImageIdx < 0) { this.currentImageIdx = 0; }
    // if (this.currentImageIdx > this.images.length - 1) { this.currentImageIdx = this.images.length - 1; }
    // this.images[this.currentImageIdx].nativeElement.scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  onSliderScroll($event) {
    if (!this.isScrolled && this.thumbnailsToShow.length < this.thumbnails.length) {
      let scrollPoz = this.slider.nativeElement.scrollWidth - this.sliderContainer.nativeElement.scrollLeft
        - this.sliderContainer.nativeElement.clientWidth;
      if (scrollPoz < 50) {
        this.isScrolled = true;
        this.thumbnailsToShow = this.thumbnailsToShow
          .concat(this.thumbnails.slice(this.thumbnailsToShow.length, this.thumbnailsToShow.length + this.itemsNumber));
        this.areImagesAdded = true;
      }
      setTimeout(() => this.isScrolled = false, 1000);
    }
  }

}
