import { Report } from '../model/report.model';
import { formatDate } from '@angular/common';
import { FoodReport } from '../model/food-report.model';
import { LAND_OG_FRITID } from '../constant/constants';
import { FlockDetails } from '../model/flock-details.model';


export class AppUtil {
  public static daysBetween(newestDate: Date, oldestDate: Date): number {
    return Math.floor((Date.UTC(newestDate.getFullYear(), newestDate.getMonth(), newestDate.getDate()) - Date.UTC(oldestDate.getFullYear(), oldestDate.getMonth(), oldestDate.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  public static compareDates(a: Date, b: Date): number {
    return a.getTime() - b.getTime();
  }

  public static compareReportsByDate(a: Report, b: Report): number {
    return AppUtil.compareDates(b.date, a.date);
  }

  public static roundToTwoDecimals(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  public static avgDaysBetweenFoodRefill(reportsWithFoodRefill: Report[]): number {
      if(reportsWithFoodRefill.length > 1) {
        const lastReport = reportsWithFoodRefill[0];
        const firstReport = reportsWithFoodRefill[reportsWithFoodRefill.length-1];
        
        const daysBetweenFirstAndLastReport = AppUtil.daysBetween(lastReport.date, firstReport.date);
        return daysBetweenFirstAndLastReport / (reportsWithFoodRefill.length - 1)
      }
      
      return 0;
  }

  public static generateNewReport(id: string, eggCounter: number, currentFlock: FlockDetails): Report {
    const newReport: Report = {
      id,
      date: new Date(),
      layedEggs: eggCounter, 
      flockDetails: { ...currentFlock }
    }
    return newReport;
  }

  public static generateRefillFoodReport(): FoodReport {
    return { price: LAND_OG_FRITID.PRICE_OF_NATURAEG, weight: LAND_OG_FRITID.WEIGHT_OF_NATURAEG };
  }

  public static generateId(locale: string): string {
    return formatDate(Date.now(), 'dd-MM-yyyy', locale);
  }
}