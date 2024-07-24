import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickBroodDetailComponent } from './chick-brood-detail.component';

describe('ChickBroodDetailComponent', () => {
  let component: ChickBroodDetailComponent;
  let fixture: ComponentFixture<ChickBroodDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChickBroodDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChickBroodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
