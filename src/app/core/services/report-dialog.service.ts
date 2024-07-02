import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Report } from '../model/report.model';
import { AppUtil } from "../util/app-util";
import { FlockService } from './flock-service.service';
import { Observable, take } from 'rxjs';
import { ReportDialogComponent } from '../../features/report/report-dialog/report-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ReportDialogService {
  private readonly FULLSCREEN_OPTIONS = {
    height: "calc(100% - 30px)",
    width: "calc(100% - 30px)",
    maxWidth: "100%",
    maxHeight: "100%"
  };

  private readonly STANDARD_DIALOG = {
      width: '300px',
      height: '250px',    
  }

  constructor(private dialog: MatDialog, private flockService: FlockService) { }

  openNewReport(date?: Date): Observable<any> {
    return this.dialog.open(ReportDialogComponent, {
      ...this.STANDARD_DIALOG,
      data: AppUtil.generateNewReport(this.flockService.getCurrentFlock(), date)
    }).afterClosed().pipe(take(1));
  }

  editReport(report: Report): Observable<any> {
    return this.dialog.open(ReportDialogComponent, {
      ...this.STANDARD_DIALOG,
      data: report
    }).afterClosed().pipe(take(1));
  }
}
