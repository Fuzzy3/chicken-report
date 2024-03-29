import { Pipe, PipeTransform } from "@angular/core";
import { DAYS } from "../constant/constants";

@Pipe({
  name: 'dateToDay',
  pure: true,
  standalone: true
})
export class DateToDayPipe implements PipeTransform {
  

  transform(value: Date | undefined): string { 
    if(value) {
      return DAYS[new Date(value).getDay()].substring(0,3);
    }
    return '';
  }
}