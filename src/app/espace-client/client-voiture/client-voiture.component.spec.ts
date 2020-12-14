import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVoitureComponent } from './client-voiture.component';

describe('ClientVoitureComponent', () => {
  let component: ClientVoitureComponent;
  let fixture: ComponentFixture<ClientVoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientVoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
