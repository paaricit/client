import { TestBed } from '@angular/core/testing';

import { LivestreamsService } from './livestreams.service';

describe('LivestreamsService', () => {
  let service: LivestreamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivestreamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
