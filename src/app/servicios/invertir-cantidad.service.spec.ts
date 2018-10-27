import { TestBed, inject } from '@angular/core/testing';
import { InvertirCantidadService } from './invertir-cantidad.service';

describe('invertirService', () => {

  let invertService: InvertirCantidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvertirCantidadService]
    });
    invertService = TestBed.get(InvertirCantidadService);
  });

  it('should be created', inject([InvertirCantidadService], (service: InvertirCantidadService) => {
    expect(service).toBeTruthy();
  }));


  function invert(str: string) {
    return invertService.invert(str);
  }

  // ---------- una cadena
  it('1) should convert 2|1 to -21 ', () => {
    expect(invert('2|1')).toBe('-21');
  });

  it('2) should convert -2|1 to 21 ', () => {
    expect(invert('-2|1')).toBe('21');
  });

  it('3) should convert |21 to -21 ', () => {
    expect(invert('|21')).toBe('-21');
  });

  it('4) should convert |-21 to 21 ', () => {
    expect(invert('|-21')).toBe('21');
  });

  it('5) should convert 12+3|4-56 to 12+-34-56 ', () => {
    expect(invert('12+3|4-56')).toBe('12+-34-56');
  });

  it('6) should convert 12+-3|4-56 to 12+34-56 ', () => {
    expect(invert('12+-3|4-56')).toBe('12+34-56');
  });

  it('7) should convert 12+|-34-56 to 12+34-56 ', () => {
    expect(invert('12+|-34-56')).toBe('12+34-56');
  });

  it('8) should convert -3|4-56 to 34-56 ', () => {
    expect(invert('-3|4-56')).toBe('34-56');
  });

  it('9) should convert 3|4-56 to -34-56 ', () => {
    expect(invert('3|4-56')).toBe('-34-56');
  });

  it('10) should convert 47+1-2|3 to 47+1--23 ', () => {
    expect(invert('47+1-2|3')).toBe('47+1--23');
  });

  it('11) should convert 47+1--2|3 to 47+1-23 ', () => {
    expect(invert('47+1--2|3')).toBe('47+1-23');
  });

  it('12) should convert 47+1-|-23 to 47+1-23 ', () => {
    expect(invert('47+1-|-23')).toBe('47+1-23');
  });

  it('13) should convert (47+1)-2|3 to (47+1)--23 ', () => {
    expect(invert('(47+1)-2|3')).toBe('(47+1)--23');
  });

  it('14) should convert (47+1)--2|3 to (47+1)-23 ', () => {
    expect(invert('(47+1)--2|3')).toBe('(47+1)-23');
  });

  it('15) should convert (47+1|2) to (47+-12) ', () => {
    expect(invert('(47+1|2)')).toBe('(47+-12)');
  });

  it('16) should convert 12(3|4 to 12(-34', () => {
    expect(invert('12(3|4')).toBe('12(-34');
  });

  it('17) should convert 12(-3|4 to 12(34', () => {
    expect(invert('12(-3|4')).toBe('12(34');
  });


});
