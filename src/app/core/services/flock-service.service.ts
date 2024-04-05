import { Injectable } from '@angular/core';
import { FlockDetails } from '../model/flock-details.model';

@Injectable({
  providedIn: 'root'
})
export class FlockService {

  private currentFlock: FlockDetails = {
    numberOfHen: 20,
    numberOfRoosters: 1
  }

  constructor() { }

  public getCurrentFlock(): FlockDetails {
    return this.currentFlock;
  }
}
