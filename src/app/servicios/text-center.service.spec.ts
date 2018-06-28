import { TestBed, inject } from '@angular/core/testing';

import { TextCenterService } from './text-center.service';

describe('TextCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextCenterService]
    });
  });

  it('should be created', inject([TextCenterService], (service: TextCenterService) => {
    expect(service).toBeTruthy();
  }));
});
