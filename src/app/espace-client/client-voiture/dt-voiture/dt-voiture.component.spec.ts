import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtVoitureComponent } from './dt-voiture.component';

describe('DtVoitureComponent', () => {
  let component: DtVoitureComponent;
  let fixture: ComponentFixture<DtVoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtVoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
