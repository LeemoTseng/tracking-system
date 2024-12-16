import { TestBed } from '@angular/core/testing';

import { CopiedService } from '../copied.service';

describe('CopiedService', () => {
  let service: CopiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
