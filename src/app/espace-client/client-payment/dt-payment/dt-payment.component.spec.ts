import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtPaymentComponent } from './dt-payment.component';

describe('DtPaymentComponent', () => {
  let component: DtPaymentComponent;
  let fixture: ComponentFixture<DtPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
