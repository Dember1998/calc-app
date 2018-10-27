import { TestBed, inject } from '@angular/core/testing';
/*
 import { EvalService } from './eval.service';

let evalService: EvalService;

describe('EvalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvalService]
    });
    evalService = TestBed.get(EvalService);
  });

  it('should be created', inject([EvalService], (service: EvalService) => {
    expect(service).toBeTruthy();
  }));
*/

  /*
  it('deberia detectar un error *1', () => {
    let s = evalService;
    try {
      s.handleMultiplicacion('*1');
    } catch (error) {
      expect(error.message).toBe('token inesperado al inicio *');
    }
  });

  it('deberia detectar un error 1+', () => {
    let s = evalService;
    try {
      s.handleMultiplicacion('1+');
    } catch (error) {
      expect(error.message).toBe('token inesperado al final +');
    }
  });

  it('deberia resolver 1+3+1 = 5', () => {
    let s = evalService;
    expect(s.handleSuma('1+3+1')).toBe('5');
  });

  it('deberia convertir +1 = 1', () => {
    let s = evalService;
    expect(s.handleSuma('+1')).toBe('1');
  });

  it('deberia detectar un error 1+', () => {
    let s = evalService;
    try {
      s.handleSuma('1+');
    } catch (error) {
      expect(error.message).toBe('token inesperado al final +');
    }
  });
*/

/*
  it('deberia resolver 1+1 = 2', () => {
    expect(evalService.execute('1+1')).toBe('2');
  });

  it('deberia resolver +1+1 = 2', () => {
    expect(evalService.execute('+1+1')).toBe('2');
  });

  it('deberia resolver 1+(1+2) = 4', () => {
    expect(evalService.execute('1+(1+2)')).toBe('4');
  });

  it('deberia resolver 1+(1+2)+(1) = 5', () => {
    expect(evalService.execute('1+(1+2)+(1)')).toBe('5');
  });

  it('deberia resolver 1+(2*(1+2)) = 7', () => {
    expect(evalService.execute('1+(2*(1+2))')).toBe('7');
  });

  it('deberia resolver 1+(1+(2*(1+2))) = 8', () => {
    expect(evalService.execute('1+(1+(2*(1+2)))')).toBe('8');
  });

  it('deberia resolver 1+(((1))) = 2', () => {
    expect(evalService.execute('1+(((1)))')).toBe('2');
  });

  it('deberia resolver 1+(+(+(1))) = 2', () => {
    expect(evalService.execute('1+(+(+(1)))')).toBe('2');
  });

  it('--- deberia resolver -1-1 = -2', () => {
    expect(evalService.execute('-1-1')).toBe('-2');
  });

  it('--- deberia resolver -1+(-2) = -3', () => {
    expect(evalService.execute('-1+(-2)')).toBe('-3');
  });

  it('deberia resolver 10/5 = 2', () => {
    expect(evalService.execute('10/5')).toBe('2');
  });

  it('deberia resolver -12/4 = -3', () => {
    expect(evalService.execute('-12/4')).toBe('-3');
  });

  it('deberia resolver -12*4 = -48', () => {
    expect(evalService.execute('-12*4')).toBe('-48');
  });

});
*/
