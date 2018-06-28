import { TestBed, inject } from '@angular/core/testing';

import { InvertirCantidadService } from './invertir-cantidad.service';

describe('InvertirCantidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvertirCantidadService]
    });
  });

  it('should be created', inject([InvertirCantidadService], (service: InvertirCantidadService) => {
    expect(service).toBeTruthy();
  }));
});
