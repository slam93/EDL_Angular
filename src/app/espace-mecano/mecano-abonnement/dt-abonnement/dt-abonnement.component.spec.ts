import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtAbonnementComponent } from './dt-abonnement.component';

describe('DtAbonnementComponent', () => {
  let component: DtAbonnementComponent;
  let fixture: ComponentFixture<DtAbonnementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtAbonnementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
