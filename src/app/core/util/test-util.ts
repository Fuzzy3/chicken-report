import { FlockDetails } from '@core/model/flock-details.model';
import { Report } from '../model/report.model';
import { AppUtil } from './app-util';

export class TestUtil {
  private static readonly FLOCK_DETAILS_STUB: FlockDetails = {
    mainFlock: {
      id: '1234',
      numberOfHen: 19,
      numberOfRoosters: 1,
    },
    flock: []
  };
  
  public static generateTestReportsForFourWeeks(locale: string): Report[] {
    const reports: Report[] = [];
    let i = 0;
    for (i = 0; i < 28; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const eggs = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
      if (date.getDay() % 6 === 3) {
        const emptyReport: Report = {
          date,
          layedEggs: 0,
        };
        reports.push(emptyReport);
      } else {
        const newReport: Report = {
          id: AppUtil.generateId(locale, date),
          date,
          layedEggs: eggs,
          flockDetails: this.FLOCK_DETAILS_STUB,
          foodReport:
            i % 7 === 0 ? AppUtil.generateRefillFoodReport() : undefined,
        };
        reports.push(newReport);
      }
    }

    reports.push(this.generateTwoMonthOldReport(locale));

    return reports;
  }

  public static generateTwoMonthOldReport(locale: string): Report {
    const date60daysAgo: Date = new Date();
    date60daysAgo.setDate(date60daysAgo.getDate() - 60);

    return {
      id: AppUtil.generateId(locale, date60daysAgo),
      date: date60daysAgo,
      layedEggs: 5,
      flockDetails: this.FLOCK_DETAILS_STUB,
    };
  }
}
