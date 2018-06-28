import { TestBed, inject } from '@angular/core/testing';

import { ResolverOperacionService } from './resolver-operacion.service';

describe('ResolverOperacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolverOperacionService]
    });
  });

  it('should be created', inject([ResolverOperacionService], (service: ResolverOperacionService) => {
    expect(service).toBeTruthy();
  }));
});
