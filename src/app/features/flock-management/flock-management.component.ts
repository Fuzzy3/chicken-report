import { FlockService } from "@core/services/flock-service.service";
import { ChickBrood, FlockDetails, isChickenBrood, isChickBrood } from "@core/model/flock-details.model";
import { KirbyModule } from "@kirbydesign/designsystem";
import { filter, tap } from "rxjs";
import { ChickenBroodDetailComponent } from "./chicken-brood-detail/chicken-brood-detail.component";
import { ChickBroodDetailComponent } from "./chick-brood-detail/chick-brood-detail.component";
import { BroodDetailDialogService } from "./brood-detail/brood-detail-dialog.service";
import { ChangeDetectorRef, Component } from "@angular/core";

@Component({
  selector: 'app-flock-management',
  standalone: true,
  imports: [KirbyModule, ChickenBroodDetailComponent, ChickBroodDetailComponent],
  templateUrl: './flock-management.component.html',
  styleUrl: './flock-management.component.scss'
})
export class FlockManagementComponent {
  chickens: FlockDetails;
  isChickenBrood = isChickenBrood;
  isChickBrood = isChickBrood;
  
  constructor(private flockService: FlockService, private broodDialogService: BroodDetailDialogService, cdr: ChangeDetectorRef) {
    flockService.getCurrentFlock$().pipe(tap(flock => this.chickens = flock)).subscribe(_ => cdr.detectChanges());
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
