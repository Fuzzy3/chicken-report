import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Brood, ChickBrood, ChickenBrood, FlockDetails } from '../model/flock-details.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUtil } from '@core/util/app-util';

@Injectable({
  providedIn: 'root'
})
export class FlockService {
  
  
  private readonly ID = "FLOCK_ID";
  private currentFlock: FlockDetails = {
    mainFlock: {
      id: '1234',
      numberOfHen: 19,
      numberOfRoosters: 1
    },
    flock: []
  }
  private flock$: BehaviorSubject<FlockDetails> = new BehaviorSubject<FlockDetails>(this.currentFlock); 


  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.flock$.next(this.getFlockFromLocalStorage());
  }

  public getCurrentFlock(): FlockDetails {
    return this.flock$.getValue();
  }


  public getCurrentFlock$(): Observable<FlockDetails> {
    return this.flock$.asObservable();
  }

  private setFlockToLocalStorage() {
    const flockAsJsonString = JSON.stringify(this.flock$.getValue());
    localStorage.setItem(this.ID, flockAsJsonString);
  }

  private getFlockFromLocalStorage(): FlockDetails {
    const flockInJsonString: string | null = localStorage.getItem(this.ID);
    if(flockInJsonString) {
      const parsedFlock: FlockDetails = JSON.parse(flockInJsonString);
      parsedFlock.mainFlock.hatchDate ? parsedFlock.mainFlock.hatchDate = new Date(parsedFlock.mainFlock.hatchDate) : undefined;
      parsedFlock.flock.forEach(brood => brood.hatchDate ? brood.hatchDate = new Date(brood.hatchDate) : undefined);
      return {...parsedFlock}
    }
    return {
      mainFlock: {
        id: 'undefined',
        numberOfHen: 0,
        numberOfRoosters: 0
      },
      flock: []
    }
  }

  submitChickBrood(broodToSubmit: ChickBrood) {
    let newFlock: FlockDetails = {...this.flock$.getValue()};
    if(!broodToSubmit.id) {
      broodToSubmit.id = AppUtil.uuid();
      newFlock.flock.push(broodToSubmit);
    } else {
      const existingBrood = this.flock$.getValue().flock.find(brood => brood.id === broodToSubmit.id);
      if(existingBrood) {
        newFlock.flock = [...newFlock.flock.filter(brood => brood.id !== existingBrood.id), broodToSubmit];
      }
    }
    
    newFlock.flock.sort(AppUtil.compareFlockByDates)
    this.setFlock(newFlock);
  }

  submitUpdateToMainFlock(mainFlockUpdate: ChickenBrood) {
    let newFlock: FlockDetails = {...this.flock$.getValue()};
    newFlock.mainFlock = mainFlockUpdate;
    this.setFlock(newFlock);
  }

  setFlock(updatedFlock: FlockDetails) {
    this.flock$.next(updatedFlock);
    this.setFlockToLocalStorage();
  }

  public getLocale(): string {
    return this.locale;
  }

  removeBrood(broodToRemoveId: string) {
    let newFlock: FlockDetails = {...this.getCurrentFlock()};
    newFlock.flock = newFlock.flock.filter(brood => brood.id !== broodToRemoveId);
    if(newFlock.flock.length !== this.getCurrentFlock().flock.length) {
      this.setFlock(newFlock); //Only persist if brood was removed
    }
  }
}
