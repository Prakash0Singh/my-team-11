import { TestBed } from '@angular/core/testing';

import { ApiHeadInterceptor } from './api-head.interceptor';

describe('ApiHeadInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiHeadInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiHeadInterceptor = TestBed.inject(ApiHeadInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
