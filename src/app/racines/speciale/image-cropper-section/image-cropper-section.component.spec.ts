import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropperSectionComponent } from './image-cropper-section.component';

describe('ImageCropperSectionComponent', () => {
  let component: ImageCropperSectionComponent;
  let fixture: ComponentFixture<ImageCropperSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
