import { AppUtil } from "./app-util";
import { Report } from '../model/report.model';
import { FlockDetails } from '../model/flock-details.model';
import { FoodReport } from "../model/food-report.model";
import { LAND_OG_FRITID } from "../constant/constants";
import { ReportsByWeek } from "@core/model/reports-by-week.model";



describe('AppUtil', () => {
  it('should calculate days between two dates', () => {
    const oldDate: Date = new Date(Date.parse('04 Dec 2024 00:12:00 GMT'));
    const newDate: Date = new Date(Date.parse('12 Dec 2024 00:12:00 GMT'));
    const eightDays: Number = AppUtil.daysBetween(newDate, oldDate);

    expect(eightDays).toEqual(8);
  });

  it('should calculate average days between food refills', () => {
    const currentFlock: FlockDetails = {
      numberOfHen: 20,
      numberOfRoosters: 1
    }

    const foodReport: FoodReport = {
      price: LAND_OG_FRITID.PRICE_OF_NATURAEG,
      weight: LAND_OG_FRITID.WEIGHT_OF_NATURAEG
    }

    const date14daysAgo: Date = new Date();
    date14daysAgo.setDate(date14daysAgo.getDate()-14);

    const report1: Report = {
      ...AppUtil.generateReport('1', 5, currentFlock),
      date: date14daysAgo,
      foodReport
    }
    
    const date7daysAgo: Date = new Date();
    date7daysAgo.setDate(date7daysAgo.getDate()-7);

    const report2: Report = {
      ...AppUtil.generateReport('2', 6, currentFlock),
      date: date7daysAgo,
      foodReport
    }

    const dateToday: Date = new Date();

    const report3: Report = {
      ...AppUtil.generateReport('3', 7, currentFlock),
      date: dateToday,
      foodReport
    }

    const days = AppUtil.avgDaysBetweenFoodRefill([report1, report2, report3]);
    expect(days).toEqual(7);
  });

  it('should get monday from thursday', () => {
    const date = new Date(2017, 4, 4, 17, 23, 42, 11);
    console.log(date);
    const monday = AppUtil.getMonday(date);
    console.log(monday.getFullYear());
    expect(monday.getDay()).toEqual(1);
  })

  it('should', () => {
    const reportsByWeek: ReportsByWeek = {
      week: 10,
      eggs: 0,
      reports: []
    }
    AppUtil.fillWeekWithEmptyReports(reportsByWeek, '');
    
    expect(reportsByWeek.reports.length === 7);
    reportsByWeek.reports.forEach(report => expect(!report.id))
  });

  it('should 2', () => {
    const reportsByWeek: ReportsByWeek = {
      week: 10,
      eggs: 0,
      reports: []
    }
    AppUtil.fillWeekWithEmptyReports(reportsByWeek, '');
    
    expect(reportsByWeek.reports.length === 7);
    reportsByWeek.reports.forEach(report => expect(!report.id))
  });

});