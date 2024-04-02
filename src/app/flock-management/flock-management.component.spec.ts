import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlockManagementComponent } from './flock-management.component';

describe('FlockManagementComponent', () => {
  let component: FlockManagementComponent;
  let fixture: ComponentFixture<FlockManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlockManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlockManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
