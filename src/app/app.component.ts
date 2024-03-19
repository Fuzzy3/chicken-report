import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReportItemComponent } from './report-item/report-item.component';
import { ReportService } from './services/report.service';
import { Report } from './model/report.model';
import { FlockDetails } from './model/flock-details.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { UploadReportsFileComponent } from './upload-reports-file/upload-reports-file.component';
import { FoodService } from './services/food.service';
import { DAYS } from './constant/constants';
import { WeekNumberPipe } from './pipe/week-number.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReportItemComponent, UploadReportsFileComponent, AsyncPipe, StatsComponent, WeekNumberPipe, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  
  refillFood: boolean = false;
  eggCounter: number = 0;
  reports$: Observable<ReadonlyArray<Report>>;


  constructor(private reportService: ReportService, private foodService: FoodService) {
    this.reports$ = reportService.getReports$();
  }

  addEggs(amount: number) {
    this.eggCounter += amount;
  }
  
  submitEggs() {
    this.reportService.submitReport(this.eggCounter, this.refillFood);
    this.eggCounter = 0;
    this.refillFood = false;
  }
  
  isNewWeek(stringDate: Date) {
    const date = new Date(stringDate);
    return date.getDay() === 1;
  }

}
