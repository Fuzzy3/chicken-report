export interface FlockDetails {
  mainFlock: ChickenBrood;
  flock: Brood[];
}

export interface Brood {
  id?: string;
  hatchDate?: Date;
  broodName?: string; 
}

export interface ChickBrood extends Brood {
  numberOfChickens: number;
}

export interface ChickenBrood extends Brood {
  numberOfHen: number;
  numberOfRoosters: number;
}

export function isChickenBrood(object: any): object is ChickenBrood {
  return 'numberOfHen' in object;
}

export function isChickBrood(object: any): object is ChickBrood {
  return 'numberOfChickens' in object;
}





/*
  FlockManagement:

  activities combined with a reduction in the flock:
  - Sold
  - Died
  - Butchered
  - Disappeared
  
  decide on sex

  price
  age
  
  
*/