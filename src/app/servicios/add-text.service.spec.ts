import { TestBed, inject } from '@angular/core/testing';
import { AddTextService } from './add-text.service';

describe('addTextService', () => {
  let service: AddTextService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddTextService]
    });
    service = TestBed.get(AddTextService);
  });



});
