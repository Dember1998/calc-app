import { TestBed, inject } from '@angular/core/testing';
import { TextCenterService } from './text-center.service';

describe('textCenterService', () => {
  let textCenterService: TextCenterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextCenterService]
    });

    textCenterService = TestBed.get(TextCenterService);
  });

  function center(str: string) {
    return textCenterService.textCenter(str);
  }

  it('should be created', inject([TextCenterService], (service: TextCenterService) => {
    expect(service).toBeTruthy();
  }));

  it('should extract +12 from +1|2', () => {
    expect(center('+1|2')).toBe('+12');
  });

  it('should extract +12 from 1+1|2', () => {
    expect(center('1+1|2')).toBe('+12');
  });

  it('should extract -23 from +12+|-23', () => {
    expect(center('+12+|-23')).toBe('-23');
  });

  it('should extract -23- from -2|3-', () => {
    expect(center('-2|3-')).toBe('-23-');
  });

  it('should extract *23+ from 12*7|3+2', () => {
    expect(center('12*7|3+2')).toBe('*73+');
  });

  it('should extract /20* from 44/2|0*2', () => {
    expect(center('44/2|0*2')).toBe('/20*');
  });

  it('should extract +23 from 98(+2|3)', () => {
    expect(center('98(+2|3)')).toBe('+23');
  });

  it('should extract 45 from 23+sen(4|5)', () => {
    expect(center('23+sen(4|5)')).toBe('45');
  });
});
