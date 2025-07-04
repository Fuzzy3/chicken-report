import { Injectable } from '@angular/core';
import { Report } from '../model/report.model';
import { AppUtil } from "../util/app-util";
import { FlockService } from './flock-service.service';
import { Observable, Subject, take } from 'rxjs';
import { ReportDialogComponent } from '../../features/report/report-dialog/report-dialog.component';
import { ModalController, ModalFlavor, ModalSize } from '@kirbydesign/designsystem';

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

  constructor(private modalController: ModalController, private flockService: FlockService) { }

  openNewReport(date?: Date): Observable<any> {
    return this.openReportModal(AppUtil.generateNewReport(this.flockService.getCurrentFlock(), date));
  }

  editReport(report: Report): Observable<any> {
    return this.openReportModal(report);
  }

  openReportModal(report: Report) {
    const componentProps = {
      report
    }

    const size: ModalSize = 'small'
    const flavor: ModalFlavor = 'modal';

    const config = {
      flavor,
      size,
      component: ReportDialogComponent,
      componentProps
    };

    const close: Subject<any> = new Subject();

    this.modalController.showModal(config, (data) => close.next(data));
    return close.asObservable().pipe(take(1));
  }
}
