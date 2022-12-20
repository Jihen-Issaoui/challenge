import { TestBed } from '@angular/core/testing';

import { UprodService } from './uprod.service';

describe('UprodService', () => {
  let service: UprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
