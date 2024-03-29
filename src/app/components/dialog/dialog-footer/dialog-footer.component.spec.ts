import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFooterComponent } from './dialog-footer.component';

describe('DialogFooterComponent', () => {
  let component: DialogFooterComponent;
  let fixture: ComponentFixture<DialogFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
