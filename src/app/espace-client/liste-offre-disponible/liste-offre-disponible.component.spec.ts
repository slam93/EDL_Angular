import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOffreDisponibleComponent } from './liste-offre-disponible.component';

describe('ListeOffreDisponibleComponent', () => {
  let component: ListeOffreDisponibleComponent; 
  let fixture: ComponentFixture<ListeOffreDisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeOffreDisponibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOffreDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
