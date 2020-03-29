import {Restaurant} from '../restaurant';
import {Hours} from './hours';
import {Location} from './location';

export class RestaurantDetails extends Restaurant {
  photos: string[];
  location: Location;
  hours: Hours[];
}
