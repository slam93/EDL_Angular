import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompImmatriculationComponent } from './comp-immatriculation.component';

describe('CompImmatriculationComponent', () => {
  let component: CompImmatriculationComponent;
  let fixture: ComponentFixture<CompImmatriculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompImmatriculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompImmatriculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
