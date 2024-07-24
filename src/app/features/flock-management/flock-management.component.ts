import { Component, Inject, LOCALE_ID } from "@angular/core";
import { FlockService } from "@core/services/flock-service.service";
import { ChickBrood, FlockDetails, isChickenBrood, isChickBrood } from "@core/model/flock-details.model";
import { CountComponent } from '@shared/components/count/count.component';
import { KirbyModule } from "@kirbydesign/designsystem";
import { DatePickerDialogService } from "@shared/components/date-picker-dialog/date-picker-dialog.service";
import { filter } from "rxjs";
import { ChickenBroodDetailComponent } from "./chicken-brood-detail/chicken-brood-detail.component";
import { ChickBroodDetailComponent } from "./chick-brood-detail/chick-brood-detail.component";
import { BroodDetailDialogService } from "./brood-detail/brood-detail-dialog.service";

@Component({
  selector: 'app-flock-management',
  standalone: true,
  imports: [CountComponent, KirbyModule, ChickenBroodDetailComponent, ChickBroodDetailComponent],
  templateUrl: './flock-management.component.html',
  styleUrl: './flock-management.component.scss'
})
export class FlockManagementComponent {
  chickens: FlockDetails;
  isChickenBrood = isChickenBrood;
  isChickBrood = isChickBrood;
  
  constructor(private flockService: FlockService, private broodDialogService: BroodDetailDialogService) {
    flockService.getCurrentFlock$().subscribe(flock => this.chickens = flock);
  }

  public newBrood() {
    this.broodDialogService.openBroodDetailDialog().pipe(filter(result => !!result)).subscribe(submittedBrood => this.addChickenBrood(submittedBrood));
  }

  public editBrood(brood: ChickBrood) {
    this.broodDialogService.openBroodDetailDialog(brood).pipe(
      filter(result => !!result)).subscribe(submittedBrood => this.addChickenBrood(submittedBrood));
  }

  public addChickenBrood(chickenBrood: ChickBrood) {
    this.flockService.submitChickBrood(chickenBrood);
  }

}
