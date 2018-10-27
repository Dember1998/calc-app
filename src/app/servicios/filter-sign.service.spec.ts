import { TestBed, inject } from '@angular/core/testing';

import { FilterSignService } from './filter-sign.service';

describe('FilterSignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterSignService]
    });
  });

  it('should be created', inject([FilterSignService], (service: FilterSignService) => {
    expect(service).toBeTruthy();
  }));
});
