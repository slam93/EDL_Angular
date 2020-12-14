import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompImageCropperComponent } from './comp-image-cropper.component';

describe('CompImageCropperComponent', () => {
  let component: CompImageCropperComponent;
  let fixture: ComponentFixture<CompImageCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompImageCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
