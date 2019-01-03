import { TestBed } from '@angular/core/testing';

import { WeatherfetchService } from './weatherfetch.service';

describe('WeatherfetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherfetchService = TestBed.get(WeatherfetchService);
    expect(service).toBeTruthy();
  });
});
