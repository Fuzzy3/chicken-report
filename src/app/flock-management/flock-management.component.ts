import { Component } from '@angular/core';
import { FlockService } from '../services/flock-service.service';
import { FlockDetails } from '../model/flock-details.model';
import { StatsRowComponent } from '../components/stats-row/stats-row.component';
import { CountComponent } from '../components/count/count.component';

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
