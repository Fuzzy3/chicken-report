import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadReportsFileComponent } from './upload-reports-file.component';

describe('UploadReportsFileComponent', () => {
  let component: UploadReportsFileComponent;
  let fixture: ComponentFixture<UploadReportsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadReportsFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadReportsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
