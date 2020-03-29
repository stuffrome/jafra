import {Restaurant} from '../restaurant';

export class RecommendedRestaurantResponse {
  restaurants: Restaurant[];
  pageSize: number;
  pageNumber: number;
  numResults: number;
}
