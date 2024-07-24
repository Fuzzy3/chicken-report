import { Component, Optional, SkipSelf } from '@angular/core';
import { KirbyAppModule, KirbyModule, Modal } from '@kirbydesign/designsystem';

@Component({
  selector: 'app-date-picker-dialog',
  standalone: true,
  imports: [KirbyModule],
  templateUrl: './date-picker-dialog.component.html',
  styleUrl: './date-picker-dialog.component.scss'
})
export class DatePickerDialogComponent {

  today: Date = new Date();
  selectedDate: Date;

  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  submit() {
    this.modal?.close(new Date(this.selectedDate));
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
  }
  
}
