import { TestBed } from '@angular/core/testing';

import { ApiEsterilavosService } from './api-esterilavos.service';

describe('ApiEsterilavosService', () => {
  let service: ApiEsterilavosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEsterilavosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
