import {
  AfterViewChecked,
  Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild,
  ViewChildren
} from '@angular/core';

interface Thumbnail {
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-masonry-gallery-down',
  templateUrl: './masonry-gallery-down.component.html',
  styleUrls: ['./masonry-gallery-down.component.css']
})
export class MasonryGalleryDownComponent implements OnInit, OnChanges, AfterViewChecked {

  private isLoaded: boolean[];
  private areImagesAdded = false;
  private isGalleryAligned = false;
  private isResized = false;

  constructor(private rend: Renderer2) { }

  @Input() thumbnails: Thumbnail[];
  @ViewChild('masonryGallery') cont: ElementRef;
  @ViewChildren('galleryItem') items: QueryList<ElementRef>;
  trackByImgId(index: number, thumbnail: any) { return thumbnail.id; }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoaded = new Array(this.thumbnails.length);
    this.isLoaded.fill(true);
    this.areImagesAdded = true;
    // console.log('OnChanges', changes);
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    // console.log('AfrerViewChecked');
    if (this.areImagesAdded && !this.isGalleryAligned) {
      this.isGalleryAligned = true;
      setTimeout(
        () => {
            this.alignGallery();
            this.isGalleryAligned = false;
            this.areImagesAdded = false;
            console.log('alignGallery');
          },
        1000);
    }

  }

  @HostListener('window:resize') onResize() {
    if (!this.isResized) {
      this.isResized = true;
      setTimeout(
        () => {
          this.alignGallery();
          this.isResized = false;
        },
        500
      );
    }
  }

  onError(thumbnail: Thumbnail) {
    this.isLoaded[this.thumbnails.indexOf(thumbnail)] = false;
    console.log('Load image error!', thumbnail);
  }

  onLoad() {
    this.areImagesAdded = true;
    // console.log('onLoad');
  }

  alignGallery() {
    let contEl = this.cont.nativeElement;
    this.rend.setStyle(contEl, 'opacity', '0');
    let contH = 300;
    this.rend.setStyle(contEl, 'height', `${contH}px`);
    while (contEl.clientWidth < contEl.scrollWidth) {
      contH += 50;
      this.rend.setStyle(contEl, 'height', `${contH}px`);
    }
    this.rend.setStyle(contEl, 'opacity', '1');
  }

}
