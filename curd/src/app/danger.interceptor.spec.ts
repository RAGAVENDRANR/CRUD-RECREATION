import { TestBed } from '@angular/core/testing';

import { DangerInterceptor } from './danger.interceptor';

describe('DangerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DangerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DangerInterceptor = TestBed.inject(DangerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
