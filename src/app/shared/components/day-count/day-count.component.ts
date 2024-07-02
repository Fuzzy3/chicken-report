import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Report } from '@core/model/report.model';
import { AppUtil } from '@core/util/app-util';


@Component({
  selector: 'app-day-count',
  standalone: true,
  imports: [],
  templateUrl: './day-count.component.html',
  styleUrl: './day-count.component.scss'
})
export class DayCountComponent {
  private _report: Report;
  reportIsToday: boolean = false;

  @Input()
  public set report(value: Report) {
    const daysBetween = AppUtil.daysBetween(new Date(), value.date);
    this.reportIsToday = daysBetween === 0;
    this._report = value;
  };

  public get report(): Report {
    return this._report;
  }
  
}
