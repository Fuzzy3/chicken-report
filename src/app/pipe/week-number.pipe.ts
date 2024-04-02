import { Pipe, PipeTransform } from '@angular/core';
import { AppUtil } from '../util/app-util';

@Pipe({
  name: 'weekNumber',
  standalone: true
})
export class WeekNumberPipe implements PipeTransform {

  transform(value: Date): number {
     // Copy date so don't modify original
     return AppUtil.dateToWeekNumber(value);
  }

}
