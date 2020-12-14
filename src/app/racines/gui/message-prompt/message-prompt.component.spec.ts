import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePromptComponent } from './message-prompt.component';

describe('MessagePromptComponent', () => {
  let component: MessagePromptComponent;
  let fixture: ComponentFixture<MessagePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
