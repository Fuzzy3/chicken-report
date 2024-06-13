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
export class DayCountComponent implements OnInit {
  @Input()
  public report: Report;
  
  reportIsToday: boolean = false;
  
  ngOnInit(): void {
    const daysBetween = AppUtil.daysBetween(new Date(), this.report?.date);
    this.reportIsToday = daysBetween === 0;
    console.log('report date', this.report.date);
  }
}
