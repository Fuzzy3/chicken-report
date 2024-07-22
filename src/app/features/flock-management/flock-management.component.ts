import { Component } from "@angular/core";
import { FlockService } from "@core/services/flock-service.service";
import { FlockDetails } from "@core/model/flock-details.model";
import { CountComponent } from '@shared/components/count/count.component';
import { KirbyModule } from "@kirbydesign/designsystem";

@Component({
  selector: 'app-flock-management',
  standalone: true,
  imports: [CountComponent, KirbyModule],
  templateUrl: './flock-management.component.html',
  styleUrl: './flock-management.component.scss'
})
export class FlockManagementComponent {
  chickens: FlockDetails;
  
  constructor(flockService: FlockService) {
    this.chickens = flockService.getCurrentFlock();
  }


}
