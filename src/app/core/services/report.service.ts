import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FileService } from './file.service';
import { FlockDetails } from '../model/flock-details.model';
import { Report } from '../model/report.model';
import { BehaviorSubject, Observable, filter, map, merge } from 'rxjs';
import { AppUtil } from '../util/app-util';
import { FlockService } from './flock-service.service';
import { ReportsByWeek } from '@core/model/reports-by-week.model';
import { TestUtil } from '@core/util/test-util';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  totalEggs: number = 0;

  private readonly ID = "EGGS_ID";
  private reports$: BehaviorSubject<ReadonlyArray<Report>> = new BehaviorSubject<ReadonlyArray<Report>>([]); 
  
  constructor(private fileService: FileService, @Inject(LOCALE_ID) private locale: string, private flockService: FlockService) {
    const persistedReports = this.getReportsFromLocalStorage();
    if(persistedReports?.length > 0) {
      this.reports$.next(persistedReports);
    }
    fileService.getReportsUploaded$().subscribe(reports => this.setReports(reports, false));
  }


  submitReport(reportToSubmit: Report) {
    let newReports: Report[] = [...this.getReports()];
    if(!reportToSubmit.id) {
      reportToSubmit.id = AppUtil.generateId(this.locale, reportToSubmit.date);
      newReports.push(reportToSubmit);
    } else {
      const existingDailyReport = this.reports$.getValue().find(report => report.id === reportToSubmit.id);
      if(existingDailyReport) {
        newReports = [...newReports.filter(report => report.id !== existingDailyReport.id), reportToSubmit];
      }
    }
    
    this.setReports(newReports);
  }

  private setReportsToLocalStorage() {
    const reportsAsJsonString = JSON.stringify(this.reports$.getValue());
    localStorage.setItem(this.ID, reportsAsJsonString);
  }

  private getReportsFromLocalStorage(): Report[] {
    const reportsInJsonString: string | null = localStorage.getItem(this.ID);
    if(reportsInJsonString) {
      const parsedReports: Report[] = JSON.parse(reportsInJsonString);
      parsedReports.forEach(report => {
        if(typeof report.date === 'string') {
          report.date = new Date(Date.parse(report.date));
        }
      });
      return [...parsedReports].sort(AppUtil.compareReportsByDate);
    }
    return [];
  }

  getReports(): ReadonlyArray<Report> {
    return this.reports$.getValue();
  }

  getReports$(): Observable<ReadonlyArray<Report>> {
    return this.reports$.asObservable();
  }

  getReportsByWeek$(): Observable<ReportsByWeek[]> {
    return this.reports$.asObservable().pipe(
      map(reports => AppUtil.reportsToWeekReports([...reports]))
    );
  }

  setReports(updatedReports: Report[], saveToFile: boolean = true) {
    updatedReports.sort(AppUtil.compareReportsByDate);
    this.reports$.next(updatedReports);
    this.setReportsToLocalStorage();
    if(saveToFile) {
      this.fileService.downloadReports(updatedReports);  
    }
  }

  getTodaysReport(): Report | undefined {
    return this.getReports().find(report => report.id === AppUtil.generateId(this.locale));
  }


  public getLocale(): string {
    return this.locale;
  }
}
