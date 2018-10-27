import { TestBed, inject } from '@angular/core/testing';

import { EscapeStrService } from './escape-str.service';

describe('EscapeStrService', () => {
  let service: EscapeStrService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscapeStrService]
    });

    service = TestBed.get(EscapeStrService);
  });

  it('should be created', inject([EscapeStrService], (Service: EscapeStrService) => {
    expect(Service).toBeTruthy();
  }));

  it('1.+ to 1.0+', () => {
    expect(service.addZero('1.+')).toEqual('1.0+');
  });

  it('4+.2 to 4+0.2', () => {
    expect(service.addZero('4+.2')).toEqual('4+0.2');
  });

  it('.5 to 0.5', () => {
    expect(service.addZero('.5')).toEqual('0.5');
  });

  it('23COS to 23*COS', () => {
    expect(service.escapeToEval('23COS')).toBe('23*COS(');
  });

  it('COS to COS(', () => {
    expect(service.escapeToEval('COS')).toBe('COS(');
  });

  it('23TAN to 23*TAN', () => {
    expect(service.escapeToEval('23TAN')).toBe('23*TAN(');
  });

  it('TAN to TAN(', () => {
    expect(service.escapeToEval('TAN')).toBe('TAN(');
  });

  it('23SEN to 23*SEN', () => {
    expect(service.escapeToEval('23SEN')).toBe('23*SEN(');
  });

  it('18PI to 18*PI', () => {
    expect(service.escapeToEval('18pi')).toBe('18*pi');
  });

  it('PI2 to PI*2', () => {
    expect(service.escapeToEval('pi2')).toBe('pi*2');
  });

  it('18e to 18*e', () => {
    expect(service.escapeToEval('18e')).toBe('18*e');
  });

  it('e28 to e*28', () => {
    expect(service.escapeToEval('e28')).toBe('e*28');
  });

  it('23e3 to 23*e*3', () => {
    expect(service.escapeToEval('23e3')).toBe('23*e*3');
  });

  it('* to \uE500*', () => {
    expect(service.escapeToEval('*')).toBe('\uE500*');
  });

  it('/ to \uE500/', () => {
    expect(service.escapeToEval('/')).toBe('\uE500/');
  });

  it('23+- to 23+\uE500-', () => {
    expect(service.escapeToEval('23+-')).toBe('23+\uE500-');
  });

  it('9-+ to 9-\uE500+', () => {
    expect(service.escapeToEval('9-+')).toBe('9-\uE500+');
  });

  it('9+-5 not be 9+\uE500-5', () => {
    expect(service.escapeToEval('9+-5')).not.toBe('9+\uE500-5');
  });

  it('1+-3+-4 not to be 1+\uE500-3+\uE500-4', () => {
    expect(service.escapeToEval('1+-3+-4')).not.toBe('1+\uE500-3+\uE500-4');
  });

  it('*2+- to be \ue500*2+\ue500-', () => {
    expect(service.escapeToEval('*2+-')).toBe('\ue500*2+\ue500-');
  });
});
