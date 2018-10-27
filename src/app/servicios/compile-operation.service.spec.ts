import { TestBed, inject } from '@angular/core/testing';

import { CompileOperationService } from './compile-operation.service';

let service: CompileOperationService;

describe('CompileOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompileOperationService]
    });
    service = TestBed.get(CompileOperationService);
  });

  it('should be created', inject([CompileOperationService], (Service: CompileOperationService) => {
    expect(Service).toBeTruthy();
  }));

  it('deberia convertir 1(2)*3(4) a 1*(2)*3*(4)', () => {
    expect(service.NumberAndParentesis('1(2)*3(4)')).toBe('1*(2)*3*(4)');
  });

  it('deberia convertir 1*(2)3 a 1*(2)*3', () => {
    expect(service.ParentesisAndNumber('1*(2)3')).toBe('1*(2)*3');
  });

  it('deberia convertir 1*(2)(3) a 1*(2)*(3)', () => {
    expect(service.ParentesisAndParentesis('1*(2)(3)')).toBe('1*(2)*(3)');
  });

  it('deberia convertir 1(2 a 1*(2)', () => {
    expect(service.handleParentesis('1(2')).toBe('1*(2)');
  });
});
