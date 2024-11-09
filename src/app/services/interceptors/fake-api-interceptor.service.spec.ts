import { TestBed } from '@angular/core/testing';

import { FakeApiInterceptorService } from './fake-api-interceptor.service';

describe('FakeApiInterceptorService', () => {
  let service: FakeApiInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeApiInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
