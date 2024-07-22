import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EggChartComponent } from './egg-chart.component';

describe('EggChartComponent', () => {
  let component: EggChartComponent;
  let fixture: ComponentFixture<EggChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EggChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EggChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
