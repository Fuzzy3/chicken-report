import { Injectable } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { DatePickerDialogComponent } from './date-picker-dialog.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatePickerDialogService {

  constructor(private modalController: ModalController) { }

  public showDatePickerDialog(): Observable<Date> {
    const config: ModalConfig = {
      component: DatePickerDialogComponent,
      flavor: 'drawer',
      size: 'large',
    };

    const dateSubject = new Subject<Date>();

    this.modalController.showModal(config, (data: Date) => {
      dateSubject.next(data);
      dateSubject.complete();
    });

    return dateSubject.asObservable();
  }
}
