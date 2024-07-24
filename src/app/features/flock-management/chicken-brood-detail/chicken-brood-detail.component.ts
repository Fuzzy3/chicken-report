import { Component, Input } from '@angular/core';
import { ChickenBrood } from '@core/model/flock-details.model';
import { FlockService } from '@core/services/flock-service.service';
import { KirbyModule } from '@kirbydesign/designsystem';

@Component({
  selector: 'app-chicken-brood-detail',
  standalone: true,
  imports: [KirbyModule],
  templateUrl: './chicken-brood-detail.component.html',
  styleUrl: './chicken-brood-detail.component.scss'
})
export class ChickenBroodDetailComponent {

  isEditing: boolean = false;
  
  @Input()
  brood: ChickenBrood;

  constructor(private flockService: FlockService) {

  }

  edit() {
    if(this.isEditing) {
      this.flockService.submitUpdateToMainFlock({...this.brood});
    }
    this.isEditing = !this.isEditing;
  }


}
