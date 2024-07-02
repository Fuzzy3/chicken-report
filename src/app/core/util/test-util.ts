import { FlockDetails } from '@core/model/flock-details.model';
import { Report } from '../model/report.model';
import { AppUtil } from './app-util';

export class TestUtil {
    private static readonly FLOCK_DETAILS_STUB: FlockDetails = {
        numberOfHen: 19,
        numberOfRoosters: 1
    }

    public static generateTestReportsForFourWeeks(locale: string): Report[] {
        const reports: Report[] = [];
        let i = 0;
        for(i = 0; i < 28; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const eggs = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
            if(date.getDay() % 6 === 3) {
                const emptyReport: Report = {
                    date,
                    layedEggs: 0
                }
                reports.push(
                   emptyReport 
                );
            } else {
                const newReport: Report = {
                    id: AppUtil.generateId(locale, date),
                    date,
                    layedEggs: eggs,
                    flockDetails: this.FLOCK_DETAILS_STUB,
                    foodReport: (i % 7 === 0) ? AppUtil.generateRefillFoodReport() : undefined
                }
                reports.push(newReport);
            }
        }
        return reports;
    }
}