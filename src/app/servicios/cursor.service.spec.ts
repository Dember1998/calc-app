import { TestBed, inject } from '@angular/core/testing';

import { CursorService } from './cursor.service';

describe('CursorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursorService]
    });
  });

  it('should be created', inject([CursorService], (service: CursorService) => {
    expect(service).toBeTruthy();
  }));
});
