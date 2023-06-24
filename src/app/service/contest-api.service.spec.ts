import { TestBed } from '@angular/core/testing';

import { ContestApiService } from './contest-api.service';

describe('ContestApiService', () => {
  let service: ContestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
