import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report/report-dialog/report-dialog.component';
import { Report } from '../model/report.model';
import { AppUtil } from "../util/app-util";
import { FlockService } from './flock-service.service';



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

  openNewReport() {
    this.dialog.open(ReportDialogComponent, {
      ...this.STANDARD_DIALOG,
      data: AppUtil.generateNewReport(this.flockService.getCurrentFlock())
    });
  }

  editReport(report: Report) {
    this.dialog.open(ReportDialogComponent, {
      ...this.STANDARD_DIALOG,
      data: report
    });
  }
}
