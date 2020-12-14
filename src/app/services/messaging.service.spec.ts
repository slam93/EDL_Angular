import { TestBed } from '@angular/core/testing';

import { MessagingService } from './messaging.service';

// @ts-ignore
describe('MessagingService', () => {
  let service: MessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingService);
  });

  // @ts-ignore
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
