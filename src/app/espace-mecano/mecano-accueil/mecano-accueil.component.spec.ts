import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoAccueilComponent } from './mecano-accueil.component';

describe('MecanoAccueilComponent', () => {
  let component: MecanoAccueilComponent;
  let fixture: ComponentFixture<MecanoAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanoAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanoAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
