import { TestBed } from '@angular/core/testing';

import { FlockService } from './flock-service.service';

describe('FlockService', () => {
  let service: FlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
