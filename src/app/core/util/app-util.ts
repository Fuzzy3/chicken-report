import { Report } from '../model/report.model';
import { formatDate } from '@angular/common';
import { FoodReport } from '../model/food-report.model';
import { FlockDetails } from '../model/flock-details.model';
import { DAYS, LAND_OG_FRITID } from '../constant/constants';
import { ReportsByWeek } from '@core/model/reports-by-week.model';


export class AppUtil {
  
  private constructor(){}

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

  public static generateReport(id: string, eggCounter: number, currentFlock: FlockDetails): Report {
    const newReport: Report = {
      id,
      date: new Date(),
      layedEggs: eggCounter, 
      flockDetails: { ...currentFlock }
    }
    return newReport;
  }

  public static generateNewReport(currentFlock: FlockDetails): Report {
    const newReport: Report = {
      date: new Date(),
      layedEggs: 0, 
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

  public static generateIdFromDate(locale: string, date: Date): string {
    return formatDate(date, 'dd-MM-yyyy', locale);
  }
  

  public static dateToDay(date: Date) {
    return DAYS[new Date(date).getDay()].substring(0,3);
  }

  public static syncIdAndDate(locale: string, reports: Report[]) {
    reports.forEach(report => {
      const idFromDate = AppUtil.generateIdFromDate(locale, report.date);
      console.log('new id', idFromDate);
      console.log('date', report.date);
      report.id = idFromDate;
    })
  }

  public static dateToWeekNumber(value: Date): number {
    const date = new Date(value);
     const dateCopy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
     // Set to nearest Thursday: current date + 4 - current day number
     // Make Sunday's day number 7
     dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - (dateCopy.getUTCDay()||7));
     // Get first day of year
     const yearStart = new Date(Date.UTC(dateCopy.getUTCFullYear(),0,1));
     // Calculate full weeks to nearest Thursday
     const weekNo = Math.ceil(( ( (dateCopy.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
     // Return array of year and week number
     return weekNo;
  }

  public static totalEggs(reports: Report[]): number {
    return reports.map(report => report.layedEggs).reduce((prev, next) => prev + next, 0);
  }

  public static reportsToWeekReports(reports: Report[]): ReportsByWeek[] {
    if(reports?.length < 1) {
      return [];
    }
    const reportsByWeek: ReportsByWeek[] = [];
    let currentWeek: ReportsByWeek = {
      week: AppUtil.dateToWeekNumber(reports[0].date),
      eggs: 0,
      reports: []
    };
    reportsByWeek.push(currentWeek);

    reports.forEach(report => {
      const weekForReport = AppUtil.dateToWeekNumber(report.date);
      if(currentWeek.week === weekForReport) {
        currentWeek.reports.push(report);
      } else {
        currentWeek = {
          week: weekForReport,
          eggs: 0,
          reports: [report]
        } 
        reportsByWeek.push(currentWeek);
      }
    })

    return reportsByWeek;
  }

}