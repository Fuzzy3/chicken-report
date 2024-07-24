import { Component, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { ChickBrood, ChickenBrood } from '@core/model/flock-details.model';
import { COMPONENT_PROPS, KirbyModule, Modal } from '@kirbydesign/designsystem';
import { CommonModule, DatePipe } from '@angular/common';
import { FlockService } from '@core/services/flock-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [KirbyModule, DatePipe, FormsModule],
  templateUrl: './brood-detail-dialog.component.html',
  styleUrl: './brood-detail-dialog.component.scss'
})
export class BroodDetailDialogComponent {

  today: Date = new Date();
  selectedDate?: Date = new Date();
  numberOfChickens: number = 0;
  showCalendar: boolean = false;
  isNewBrood: boolean = true;
  id: string;
  name: string;

  constructor(@Optional() @SkipSelf() private modal: Modal, @Inject(COMPONENT_PROPS) private brood: ChickBrood, private flockService: FlockService) {
    console.log('props', brood);
    if(brood) {
      if(brood.hatchDate) {
        this.selectedDate = brood.hatchDate;
      }
      if(brood.numberOfChickens) {
        this.numberOfChickens = brood.numberOfChickens;
      }
      if(brood.id) {
        this.id = brood.id;
        this.isNewBrood = false;
      }
      if(brood.broodName) {
        this.name = brood.broodName;
      }
    }
  }

  submit() {
    
    const brood: ChickBrood = {
      numberOfChickens: this.numberOfChickens,
      hatchDate: this.selectedDate,
      broodName: this.name,
      id: this.id
    }
    this.modal?.close(brood);
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
  }

  removeBrood() {
    if(this.brood.id) {
      this.flockService.removeBrood(this.brood.id);
      this.modal.close();
    }
  } 

}
