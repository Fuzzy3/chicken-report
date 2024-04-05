import { FlockDetails } from "./flock-details.model";
import { FoodReport } from "./food-report.model";

export interface Report {
  id?: string;
  date: Date;
  layedEggs: number;
  flockDetails: FlockDetails,
  foodReport?: FoodReport
}