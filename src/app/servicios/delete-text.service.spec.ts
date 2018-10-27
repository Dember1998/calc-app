import { TestBed, inject } from '@angular/core/testing';

import { DeleteTextService } from './delete-text.service';
import { CursorService } from './cursor.service';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { TextCursorService } from './text-cursor.service';

describe('DeleteTextService', () => {
  let service: DeleteTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteTextService
      ]
    });
    service = TestBed.get(DeleteTextService);
  });

  // tslint:disable-next-line:no-shadowed-variable
  it('should be created', inject([DeleteTextService], (service: DeleteTextService) => {
    expect(service).toBeTruthy();
  }));

  it('should delete 123|4 to 124', () => {
    expect(service.delete('123|4')).toBe('124');
  });

  it('should delete 1998*COS(| to 1998*', () => {
    expect(service.delete('1998*COS(|')).toBe('1998*');
  });

  it('should deltete 1998*TAN(| to 1998*', () => {
    expect(service.delete('1998*TAN(|')).toBe('1998*');
  });

  it('should deltete 1998*SEN(| to 1998*', () => {
    expect(service.delete('1998*SEN(|')).toBe('1998*');
  });

  it('should deltete 1998| to 199', () => {
    expect(service.delete('1998|')).toBe('199');
  });

  it('should delete 123*COS(23|) to 123*COS(2)', () => {
    expect(service.delete('123*COS(23|)')).toBe('123*COS(2)');
  });

  it('should delete 123*COS(|67) to 123*67)', () => {
    expect(service.delete('123*COS(|67)')).toBe('123*67)');
  });

  it('should delete COS(67)|  to COS(67', () => {
    expect(service.delete('COS(67)|')).toBe('COS(67');
  });

  it('should delete 2|  to \'\'', () => {
    expect(service.delete('2|')).toBe('');
  });

  it('should return 2  \'\' to \'\'', () => {
    expect(service.delete('')).toBe('');
    expect(service.delete('|')).toBe('');
  });

  it('should delete 2*PI| to 2*', () => {
    expect(service.delete('2*PI|')).toBe('2*');
  });

  it('should delete 2*E| to 2*', () => {
    expect(service.delete('2*E|')).toBe('2*');
  });

});
