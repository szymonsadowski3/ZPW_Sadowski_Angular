import { TestBed } from '@angular/core/testing';

import { KoszykService } from './koszyk.service';

describe('KoszykService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KoszykService = TestBed.get(KoszykService);
    expect(service).toBeTruthy();
  });
});
