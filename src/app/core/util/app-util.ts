import { Report } from '../model/report.model';
import { formatDate } from '@angular/common';
import { FoodReport } from '../model/food-report.model';
import { FlockDetails } from '../model/flock-details.model';
import { DAYS, LAND_OG_FRITID } from '../constant/constants';
import { ReportsByWeek } from '@core/model/reports-by-week.model';


export class AppUtil {
  
  private constructor(){}

  public static daysBetween(newestDate: Date, oldestDate: Date): number {
    return Math.abs(Math.floor((Date.UTC(newestDate.getFullYear(), newestDate.getMonth(), newestDate.getDate()) - Date.UTC(oldestDate.getFullYear(), oldestDate.getMonth(), oldestDate.getDate()) ) /(1000 * 60 * 60 * 24)));
  }

  public static dateIsToday(date: Date): boolean {
    return AppUtil.daysBetween(new Date(), date) === 0;
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

  public static generateNewReport(currentFlock: FlockDetails, date?: Date): Report {
    const newReport: Report = {
      date: date ? date : new Date(),
      layedEggs: 0, 
      flockDetails: { ...currentFlock }
    }
    return newReport;
  }

  public static generateRefillFoodReport(): FoodReport {
    return { price: LAND_OG_FRITID.PRICE_OF_NATURAEG, weight: LAND_OG_FRITID.WEIGHT_OF_NATURAEG };
  }

  public static generateId(locale: string, date?: Date): string {
    return formatDate(date ? date : new Date(), 'dd-MM-yyyy', locale);
  }

  public static formatDate(locale: string, date: Date): string {
    return formatDate(date, 'EEE dd/MM/yyyy', locale);
  }  

  public static dateToDay(date: Date) {
    return DAYS[new Date(date).getDay()].substring(0,3);
  }

  public static syncIdAndDate(locale: string, reports: Report[]) {
    reports.forEach(report => {
      const idFromDate = AppUtil.generateId(locale, report.date);
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

  public static getMondayOfWeek(week: number, year: number = 2024): Date {
    const day = (1 + (week - 1) * 7); // 1st of January + 7 days for each week

    return new Date(year, 0, day);
  }

  public static thisWeekNumber(): number {
    return this.dateToWeekNumber(new Date());
  }

  public static getMonday(value: Date): Date {
    const date = new Date(value);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  public static fillWeekWithEmptyReports(reportsByWeek: ReportsByWeek, locale: string) {
    let firstDayOfWeek: Date = this.getMondayOfWeek(reportsByWeek.week);
    let reportCounter = reportsByWeek.reports.length;
    const reports: Report[] = [];
    for(let i = 7; i > 0; i--) {
      let newDate = new Date(firstDayOfWeek);
      newDate.setDate(newDate.getDate()+i-1);
      if(reportCounter === 0) {
        const emptyReport: Report = {
          date: newDate,
          layedEggs: 0
        }
        reports.push(emptyReport);
      } else {
        const existingReport = reportsByWeek.reports.find(report => AppUtil.generateId(locale, newDate) === report.id);
        if(existingReport) {
          reports.push(existingReport);
          reportCounter--;
        } else {
          const emptyReport: Report = {
            date: newDate,
            layedEggs: 0
          }
          reports.push(emptyReport);
        }
      }
    }
    reportsByWeek.reports = reports;
    
  }

  public static totalEggs(reports: Report[]): number {
    return reports.map(report => report.layedEggs).reduce((prev, next) => prev + next, 0);
  }

  /**
   * @param reports reports that should be grouped into weeks
   * @returns grouped reports from the first reported week until today with empty reports on unreported days 
   */
  public static reportsToWeekReports(reports: Report[], locale: string): ReportsByWeek[] {
    if(reports?.length < 1) {
      return [{
        week: AppUtil.dateToWeekNumber(new Date()),
        eggs: 0,
        reports: []
      }];
    }
    const reportsByWeek: ReportsByWeek[] = [];
    let currentWeek: ReportsByWeek;

    reports.forEach(report => {
      const weekForReport = AppUtil.dateToWeekNumber(report.date);
      if(currentWeek?.week === weekForReport) {
        currentWeek.reports.push(report);
        currentWeek.eggs += report.layedEggs;
      } else {
        currentWeek = {
          week: weekForReport,
          eggs: report.layedEggs,
          reports: [report]
        } 
        reportsByWeek.push(currentWeek);
      }
    })
    return reportsByWeek;
  }

  public static reportsToWeekReportFillEmptyWeeks(reports: Report[], locale: string): ReportsByWeek[] {
    const firstReport: Report = reports[reports.length-1];
    const firstWeek = this.dateToWeekNumber(firstReport.date);
    const thisWeek = this.dateToWeekNumber(new Date());
    console.log('first week', firstWeek);
    console.log('current week', thisWeek);

    const reportsByWeek: ReportsByWeek[] = [];

    for(let i = firstWeek; i <= thisWeek; i++) {
      const reportsForWeek = [...reports.filter(report => this.dateToWeekNumber(report.date) === i)];
      const currentWeek = {
        week: i,
        eggs: reportsForWeek.reduce((prev, curr) => prev += curr.layedEggs, 0),
        reports: reportsForWeek
      };
      reportsByWeek.push(currentWeek);
      this.fillWeekWithEmptyReports(currentWeek, locale);
    }
    
    
    console.log('result', reportsByWeek);
    return reportsByWeek;
  }



}