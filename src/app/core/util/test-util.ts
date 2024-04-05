import { FlockDetails } from '@core/model/flock-details.model';
import { Report } from '../model/report.model';
import { AppUtil } from './app-util';

export class TestUtil {
    private static readonly FLOCK_DETAILS_STUB: FlockDetails = {
        numberOfHen: 20,
        numberOfRoosters: 1
    }

    public static generateTestReportsForFourWeeks(locale: string): Report[] {
        const reports: Report[] = [];
        let i = 0;
        for(i = 0; i < 28; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const eggs = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            const newReport: Report = {
                id: AppUtil.generateIdFromDate(locale, date),
                date,
                layedEggs: eggs,
                flockDetails: this.FLOCK_DETAILS_STUB,
                foodReport: (i % 7 === 0) ? AppUtil.generateRefillFoodReport() : undefined
            }
            reports.push(newReport);
        }
        return reports;
    }
}