import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekNumber',
  standalone: true
})
export class WeekNumberPipe implements PipeTransform {

  transform(value: Date): number {
     // Copy date so don't modify original
     const date = new Date(value);
     const dateCopy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
     // Set to nearest Thursday: current date + 4 - current day number
     // Make Sunday's day number 7
     dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - (dateCopy.getUTCDay()||7));
     // Get first day of year
     const yearStart = new Date(Date.UTC(dateCopy.getUTCFullYear(),0,1));
     // Calculate full weeks to nearest Thursday
     const weekNo = Math.ceil(( ( (dateCopy.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
     // Return array of year and week number
     return weekNo;
  }

}
