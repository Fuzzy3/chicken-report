import { Component } from '@angular/core';
import { Observable, combineLatest, filter, map, of, shareReplay } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { CountComponent } from '@shared/components/count/count.component';
import { StatsRowComponent } from '@shared/components/stats-row/stats-row.component';
import { ReportService } from '@core/services/report.service';
import { FlockService } from '@core/services/flock-service.service';
import { StatsService } from '@core/services/stats.service';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, MatChipsModule, CountComponent, StatsRowComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {

  totalEggs$: Observable<number> = of(0);
  averageEggsPerDay$: Observable<number> = of(0);
  pricePerEgg$: Observable<number> = of(0);
  avgDaysBetweenFoodRefill$: Observable<number> = of(0);
  weightPerChickenPerDay$: Observable<number> = of(0);

  constructor(statsService: StatsService, reportService: ReportService, flockService: FlockService) {
    this.totalEggs$ = statsService.totalEggs$();
    this.averageEggsPerDay$ = statsService.averageEggsPerDay$();
    this.avgDaysBetweenFoodRefill$ = statsService.avgDaysBetweenFoodRefill$();
    this.pricePerEgg$ = statsService.pricePerEgg$();
    this.weightPerChickenPerDay$ = statsService.avgFoodEatenPerChickenPerDayInGrams$();
  }
  
}