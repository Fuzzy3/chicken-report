import { Injectable } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { BroodDetailDialogComponent } from './brood-detail-dialog.component';
import { Subject } from 'rxjs';
import { ChickBrood } from '@core/model/flock-details.model';

@Injectable({
  providedIn: 'root'
})
export class BroodDetailDialogService {

  constructor(private modalController: ModalController) {}

  openBroodDetailDialog(existingBrood?: ChickBrood) {
    const config: ModalConfig = {
      component: BroodDetailDialogComponent,
      flavor: 'drawer',
      size: 'large',
      componentProps: existingBrood
    };

    const chickenBroodSubject = new Subject<ChickBrood>();

    this.modalController.showModal(config, (chickenBrood: ChickBrood) => {
      chickenBroodSubject.next(chickenBrood);
      chickenBroodSubject.complete();
    });

    return chickenBroodSubject.asObservable();
  }
  
}
