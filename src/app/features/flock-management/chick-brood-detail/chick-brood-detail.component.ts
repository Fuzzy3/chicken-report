import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { ChickBrood } from '@core/model/flock-details.model';
import { AppUtil } from '@core/util/app-util';
import { KirbyModule, UniqueIdGenerator } from '@kirbydesign/designsystem';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-chick-brood-detail',
  standalone: true,
  imports: [KirbyModule],
  templateUrl: './chick-brood-detail.component.html',
  styleUrl: './chick-brood-detail.component.scss'
})
export class ChickBroodDetailComponent {
  private chickBrood: ChickBrood;
  ageInWeeks?: number;
  price?: number;
  name: string;
  
  @Input()
  set brood(brood: ChickBrood) {
    this.chickBrood = brood;
    this.ageInWeeks = AppUtil.getWeekAgeFromDate(brood.hatchDate);
    this.price = AppUtil.chickPriceFromWeekAge(this.ageInWeeks);        
    this.name = brood.broodName ? brood.broodName : brood.hatchDate ? formatDate(brood.hatchDate, 'dd-MM-yyyy', this.locale) : brood.id ? brood.id : 'No Name';
    console.log('name', this.name);
  };

  get brood(): ChickBrood {
    return this.chickBrood;
  }

  @Output()
  edit: EventEmitter<ChickBrood> = new EventEmitter();


  constructor(@Inject(LOCALE_ID) private locale: string) {}
  
}
