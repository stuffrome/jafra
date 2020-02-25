import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurant} from '../models/restaurant';
import {SortType} from '../enums/sort-type.enum';

@Injectable()
export class RestaurantService {

  private restaurantUrl: string;

  constructor(private http: HttpClient) {
    // this.restaurantUrl = 'jafra-backend.herokuapp.com/restaurants';
    this.restaurantUrl = 'http://localhost:8080/restaurants';
  }

  public findRestaurantsWith(categories: string): Observable<Restaurant[]> {
    let params = new HttpParams()
      .set('latitude', '29.6516')
      .set('longitude', '-82.3248')
      .set('radius', '4000');

    if (categories) {
      params = params.set('categories', categories);
    }

    return this.http.get<Restaurant[]>(this.restaurantUrl, {params});
  }

  public sortRestaurants(restaurants: Restaurant[], sortType: SortType): Restaurant[] {
    let sortFunc: (a: Restaurant, b: Restaurant) => number;
    switch (sortType) {
      case SortType.NAME:
        sortFunc = (a, b) => a.name < b.name ? -1 : 1;
        break;

      case SortType.PRICE:
        sortFunc = (a, b) => {
          if (a.price == null) {
            return 1;
          }
          else if (b.price == null) {
            return -1;
          }
          else {
            return a.price < b.price ? -1 : 1;
          }
        };
        break;

      case SortType.DISTANCE:
        sortFunc = (a, b) => a.distance - b.distance;
        break;
    }

    return restaurants.sort(sortFunc);
  }
}
