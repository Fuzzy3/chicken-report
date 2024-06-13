import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { ReportService } from './report.service';
import { Observable, combineLatest, filter, map, tap } from 'rxjs';
import { AppUtil } from '../util/app-util';
import { LAND_OG_FRITID } from '@core/constant/constants';
import { FlockService } from './flock-service.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {



  constructor(private reportService: ReportService, private flockService: FlockService) {
    
  }

  averageEggsPerDay$(): Observable<number> {
    return this.reportService.getReports$().pipe(
      map(reports => reports.map(singleReport => singleReport.layedEggs)),
      map(layedEggs => {
        const sum = layedEggs.reduce((prev, next) => prev + next, 0);
        return sum/layedEggs.length;
      }),
      map(avgEggs => AppUtil.roundToTwoDecimals(avgEggs))
    );
  }

  pricePerEgg$(): Observable<number> {
    return combineLatest([this.averageEggsPerDay$(), this.avgDaysBetweenFoodRefill$()]).pipe(
      filter(([avgEggsPerDay, avgDaysBetweenFoodRefill]) => avgDaysBetweenFoodRefill > 0 && avgEggsPerDay > 0),
      map(([avgEggsPerDay, avgDaysBetweenFoodRefill]) => AppUtil.roundToTwoDecimals(LAND_OG_FRITID.PRICE_OF_NATURAEG / (avgEggsPerDay * avgDaysBetweenFoodRefill)))
    );
  }

  totalEggs$(): Observable<number> {
    return this.reportService.getReports$().pipe(
      map(reports => reports.map(singleReport => singleReport.layedEggs)),
      map(layedEggs => layedEggs.reduce((prev, next) => prev + next, 0))
    );
  }

  avgDaysBetweenFoodRefill$(): Observable<number> {
    return this.reportService.getReports$().pipe(
      map(reports => reports.filter(report => !!report.foodReport)),
      map(sortedFoodReports => AppUtil.avgDaysBetweenFoodRefill(sortedFoodReports))
    );
  }

  avgFoodEatenPerChickenPerDayInGrams$(): Observable<number> {
    return this.avgDaysBetweenFoodRefill$().pipe(
      map(daysBetweenRefills => (AppUtil.generateRefillFoodReport().weight/(this.flockService.getCurrentFlock().numberOfHen + this.flockService.getCurrentFlock().numberOfRoosters))/daysBetweenRefills),
      map(weightInKilos => weightInKilos * 1000),
      map(weightInGrams => Math.round(weightInGrams))
    )
  }

  


  //statsByWeek

}
