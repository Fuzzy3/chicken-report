import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickenBroodDetailComponent } from './chicken-brood-detail.component';

describe('ChickenBroodDetailComponent', () => {
  let component: ChickenBroodDetailComponent;
  let fixture: ComponentFixture<ChickenBroodDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChickenBroodDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChickenBroodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
