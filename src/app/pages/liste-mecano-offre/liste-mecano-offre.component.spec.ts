import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMecanoOffreComponent } from './liste-mecano-offre.component';

describe('ListeMecanoOffreComponent', () => {
  let component: ListeMecanoOffreComponent;
  let fixture: ComponentFixture<ListeMecanoOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMecanoOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMecanoOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
