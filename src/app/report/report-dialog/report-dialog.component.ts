import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogModule } from '../../components/dialog.module';
import { Report } from '../../model/report.model'
import { AppUtil } from '../../util/app-util';

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
  reportTitle: string = "New Report Today"

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Report,
    @Inject(LOCALE_ID) private locale: string,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    private reportService: ReportService) {
    if(data) {
      this.report = {...data};
      if(this.report.id) {
        this.reportTitle = "Edit Report - " + AppUtil.dateToDay(this.report.date) + " " + this.report.id;
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
