import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStripeComponentsComponent } from './payment-stripe-components.component';

describe('PaymentStripeComponentsComponent', () => {
  let component: PaymentStripeComponentsComponent;
  let fixture: ComponentFixture<PaymentStripeComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentStripeComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStripeComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
