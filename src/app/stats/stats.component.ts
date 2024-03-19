import { Component } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Observable, combineLatest, filter, first, map, of, share, shareReplay, tap } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Report } from '../model/report.model';
import { AppUtil } from '../util/app-util';
import { LAND_OG_FRITID } from '../constant/constants';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {

  totalEggs$: Observable<number> = of(0);
  averageEggsPerDay$: Observable<number> = of(0);
  pricePerEgg$: Observable<number> = of(0);
  avgDaysBetweenFoodRefill$: Observable<number> = of(0);

  constructor(reportService: ReportService) {
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
        return sum/layedEggs.length+1;
      }),
      map(avgEggs => AppUtil.roundToTwoDecimals(avgEggs))
    );
  
    this.avgDaysBetweenFoodRefill$ = reports$.pipe(
      map(reports => reports.filter(report => !!report.foodReport)),
      map(sortedFoodReports => AppUtil.avgDaysBetweenFoodRefill(sortedFoodReports))
    );

    this.pricePerEgg$ = combineLatest([this.averageEggsPerDay$, this.avgDaysBetweenFoodRefill$]).pipe(
      map(([avgEggsPerDay, avgDaysBetweenFoodRefill]) => AppUtil.roundToTwoDecimals(LAND_OG_FRITID.PRICE_OF_NATURAEG / (avgEggsPerDay * avgDaysBetweenFoodRefill)))
    );
  }
  
}