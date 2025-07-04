import { Component, Inject, LOCALE_ID, Optional, SkipSelf } from '@angular/core';
import { ReportService } from '@core/services/report.service';
import { FormsModule } from '@angular/forms';
import { Report } from '@core/model/report.model'
import { AppUtil } from '@core/util/app-util';
import { ButtonComponent, CheckboxComponent, COMPONENT_PROPS, FlagComponent, IconComponent, IconModule, ItemModule, Modal, ModalFooterComponent, PageModule } from '@kirbydesign/designsystem';
import { IncrementComponent } from "../../../shared/components/increment/increment.component";


@Component({
  selector: 'app-report-dialog',
  standalone: true,
  imports: [FormsModule, ItemModule, ModalFooterComponent, PageModule, IconModule, FlagComponent, CheckboxComponent, IncrementComponent, ButtonComponent],
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.scss'
})
export class ReportDialogComponent {

  report: Report;
  refillFood: boolean = false;
  reportTitle: string = "New Report - Today";
  isNewReport: boolean = true;

  constructor(
    @Inject(COMPONENT_PROPS) private data: any,
    @Inject(LOCALE_ID) private locale: string,
    @Optional() @SkipSelf() private modal: Modal,
    private reportService: ReportService) {
    if(data) {
      this.report = {...data.report};
      const dateString = this.report.date && !AppUtil.dateIsToday(this.report.date) ? AppUtil.formatDate(locale, this.report.date) : 'Today';
      this.isNewReport = !this.report.id;
      if(this.isNewReport) {
        this.reportTitle = 'New Report - ' + dateString;
      } else {
        this.reportTitle = 'Edit Report - ' + dateString;
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

  deleteReport() {
    this.reportService.deleteReport(this.report);
    this.close();
  }

  close() {
    this.modal.close();
  }
  
}
