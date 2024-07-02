import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '@core/services/report.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogModule } from '@shared/components/dialog/dialog.module';
import { Report } from '@core/model/report.model'
import { AppUtil } from '@core/util/app-util';

@Component({
  selector: 'app-report-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButtonModule, MatIconModule, DialogModule, MatCheckboxModule],
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.scss'
})
export class ReportDialogComponent {

  report: Report;
  refillFood: boolean = false;
  reportTitle: string = "New Report - Today";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Report,
    @Inject(LOCALE_ID) private locale: string,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    private reportService: ReportService) {
    if(data) {
      this.report = {...data};
      const dateString = this.report.date && !AppUtil.dateIsToday(this.report.date) ? AppUtil.formatDate(locale, this.report.date) : 'Today';
      if(this.report.id) {
        this.reportTitle = 'Edit Report - ' + dateString;
      } else {
        this.reportTitle = 'New Report - ' + dateString;
      }
      if(this.report.foodReport) {
        this.refillFood = true;
      }
    }
  }

  

  addEggs(amount: number) {
    if(this.report.layedEggs + amount > -1) {
      this.report.layedEggs += amount;
    }
  }
  
  submitEggs() {
    if(this.refillFood && !this.report.foodReport) {
      this.report.foodReport = AppUtil.generateRefillFoodReport();
    }
    if(!this.refillFood && this.report.foodReport) {
      this.report.foodReport = undefined;
    }
    this.reportService.submitReport(this.report);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
  
}
