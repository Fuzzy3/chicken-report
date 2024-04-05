import { Component } from "@angular/core";
import { FlockService } from "@core/services/flock-service.service";
import { FlockDetails } from "@core/model/flock-details.model";
import { StatsRowComponent } from '@shared/components/stats-row/stats-row.component';
import { CountComponent } from '@shared/components/count/count.component';

@Component({
  selector: 'app-flock-management',
  standalone: true,
  imports: [StatsRowComponent, CountComponent],
  templateUrl: './flock-management.component.html',
  styleUrl: './flock-management.component.scss'
})
export class FlockManagementComponent {
  chickens: FlockDetails;
  
  constructor(flockService: FlockService) {
    this.chickens = flockService.getCurrentFlock();
  }


}
