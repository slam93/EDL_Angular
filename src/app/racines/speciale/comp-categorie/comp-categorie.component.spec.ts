import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCategorieComponent } from './comp-categorie.component';

describe('CompCategorieComponent', () => {
  let component: CompCategorieComponent;
  let fixture: ComponentFixture<CompCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
