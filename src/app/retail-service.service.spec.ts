import { TestBed } from '@angular/core/testing';

import { RetailServiceService } from './retail-service.service';

describe('RetailServiceService', () => {
  let service: RetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
