import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryGalleryAcrossComponent } from './masonry-gallery-across.component';

describe('MasonryGalleryAcrossComponent', () => {
  let component: MasonryGalleryAcrossComponent;
  let fixture: ComponentFixture<MasonryGalleryAcrossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonryGalleryAcrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryGalleryAcrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
