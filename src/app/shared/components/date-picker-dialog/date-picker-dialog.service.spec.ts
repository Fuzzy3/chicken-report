import { TestBed } from '@angular/core/testing';

import { DatePickerDialogService } from './date-picker-dialog.service';

describe('DatePickerDialogService', () => {
  let service: DatePickerDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
