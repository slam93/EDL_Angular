import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompDonationComponent } from './comp-donation.component';

describe('CompDonationComponent', () => {
  let component: CompDonationComponent;
  let fixture: ComponentFixture<CompDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
