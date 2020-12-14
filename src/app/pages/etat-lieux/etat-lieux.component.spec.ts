import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatLieuxComponent } from './etat-lieux.component';

describe('EtatLieuxComponent', () => {
  let component: EtatLieuxComponent;
  let fixture: ComponentFixture<EtatLieuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatLieuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
