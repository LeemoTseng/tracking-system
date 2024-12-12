import { TestBed } from '@angular/core/testing';

import { MainInterfaceService } from '../interfaces/main-interface.service';

describe('MainInterfaceService', () => {
  let service: MainInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
