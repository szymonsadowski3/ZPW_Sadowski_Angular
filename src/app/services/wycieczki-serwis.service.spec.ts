import { TestBed } from '@angular/core/testing';

import { WycieczkiSerwisService } from './wycieczki-serwis.service';

describe('WycieczkiSerwisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WycieczkiSerwisService = TestBed.get(WycieczkiSerwisService);
    expect(service).toBeTruthy();
  });
});
