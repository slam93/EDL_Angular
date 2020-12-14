import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCropimageComponent } from './client-cropimage.component';

describe('ClientCropimageComponent', () => {
  let component: ClientCropimageComponent;
  let fixture: ComponentFixture<ClientCropimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCropimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCropimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
