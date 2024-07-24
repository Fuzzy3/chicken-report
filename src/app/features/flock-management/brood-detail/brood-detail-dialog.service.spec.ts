import { TestBed } from '@angular/core/testing';

import { BroodDetailDialogService } from './brood-detail-dialog.service';

describe('HatchDetailDialogService', () => {
  let service: BroodDetailDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroodDetailDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
