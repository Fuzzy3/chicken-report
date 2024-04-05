import { Component } from '@angular/core';
import { Observable, combineLatest, filter, map, of, shareReplay } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { LAND_OG_FRITID } from '@core/constant/constants';
import { MatChipsModule } from '@angular/material/chips';
import { CountComponent } from '@shared/components/count/count.component';
import { StatsRowComponent } from '@shared/components/stats-row/stats-row.component';
import { ReportService } from '@core/services/report.service';
import { FlockService } from '@core/services/flock-service.service';
import { AppUtil } from '@core/util/app-util';


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

  constructor(reportService: ReportService, flockService: FlockService) {
    const reports$ = reportService.getReports$().pipe(
      shareReplay(1)
    );

    this.totalEggs$ = reports$.pipe(
      map(reports => reports.map(singleReport => singleReport.layedEggs)),
      map(layedEggs => layedEggs.reduce((prev, next) => prev + next, 0))
    );

    this.averageEggsPerDay$ = reports$.pipe(
      map(reports => reports.map(singleReport => singleReport.layedEggs)),
      map(layedEggs => {
        const sum = layedEggs.reduce((prev, next) => prev + next, 0);
        return sum/layedEggs.length;
      }),
      map(avgEggs => AppUtil.roundToTwoDecimals(avgEggs))
    );
  
    this.avgDaysBetweenFoodRefill$ = reports$.pipe(
      map(reports => reports.filter(report => !!report.foodReport)),
      map(sortedFoodReports => AppUtil.avgDaysBetweenFoodRefill(sortedFoodReports))
    );

    this.pricePerEgg$ = combineLatest([this.averageEggsPerDay$, this.avgDaysBetweenFoodRefill$]).pipe(
      filter(([avgEggsPerDay, avgDaysBetweenFoodRefill]) => avgDaysBetweenFoodRefill > 0 && avgEggsPerDay > 0),
      map(([avgEggsPerDay, avgDaysBetweenFoodRefill]) => AppUtil.roundToTwoDecimals(LAND_OG_FRITID.PRICE_OF_NATURAEG / (avgEggsPerDay * avgDaysBetweenFoodRefill)))
    );

    this.weightPerChickenPerDay$ = this.avgDaysBetweenFoodRefill$.pipe(
      map(daysBetweenRefills => (AppUtil.generateRefillFoodReport().weight/(flockService.getCurrentFlock().numberOfHen + flockService.getCurrentFlock().numberOfRoosters))/daysBetweenRefills),
      map(weightInKilos => weightInKilos * 1000),
      map(weightInGrams => Math.round(weightInGrams))
    )
  }
  
}