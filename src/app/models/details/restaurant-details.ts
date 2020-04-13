import {Restaurant} from '../restaurant';
import {Hour} from './hour';
import {Location} from './location';

export class RestaurantDetails extends Restaurant {
  photos: string[];
  location: Location;
  hours: Hour[];
}
