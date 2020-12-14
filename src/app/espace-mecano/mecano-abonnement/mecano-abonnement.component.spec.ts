import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoAbonnementComponent } from './mecano-abonnement.component';

describe('MecanoAbonnementComponent', () => {
  let component: MecanoAbonnementComponent;
  let fixture: ComponentFixture<MecanoAbonnementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanoAbonnementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanoAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
