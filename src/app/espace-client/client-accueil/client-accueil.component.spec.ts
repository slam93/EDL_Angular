import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccueilComponent } from './client-accueil.component';

describe('ClientAccueilComponent', () => {
  let component: ClientAccueilComponent;
  let fixture: ComponentFixture<ClientAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
