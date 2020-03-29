import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurant} from '../models/restaurant';
import {SortType} from '../enums/sort-type.enum';
import {RestaurantDetails} from '../models/details/restaurant-details';
import {LocationService} from './location.service';
import {RecommendedRestaurantResponse} from '../models/backend-response/recommended-restaurant-response';

@Injectable()
export class RestaurantService {

  private restaurantUrl: string;

  private readonly DEFAULT_LAT = '29.6516';
  private readonly DEFAULT_LONG = '-82.3248';

  constructor(private http: HttpClient, private location: LocationService) {
    // this.restaurantUrl = 'https://jafra-backend.herokuapp.com/restaurants';
    this.restaurantUrl = 'http://localhost:8080/restaurants';
  }

  public findRestaurantsWith(term: string, latitude: number, longitude: number): Observable<Restaurant[]> {
    let params = new HttpParams()
      .set('radius', '4000');

    if (latitude && longitude) {
      params = params
        .set('latitude', latitude.toString())
        .set('longitude', longitude.toString());
    } else {
      params = params
        .set('latitude', this.DEFAULT_LAT)
        .set('longitude', this.DEFAULT_LONG);
    }

    if (term) {
      params = params.set('restaurantName', term);
    }

    return this.http.get<Restaurant[]>(this.restaurantUrl, {params});
  }

  public getRestaurantDetails(id: string): Observable<RestaurantDetails> {
    const params = new HttpParams()
      .set('id', id);

    return this.http.get<RestaurantDetails>(this.restaurantUrl + '/details', {params});
  }

  public getRecommendedRestaurants(
    user: string,
    pageSize: number,
    pageNumber: number,
    latitude: number,
    longitude: number): Observable<RecommendedRestaurantResponse> {
      let params = new HttpParams()
        .set('username', user)
        .set('pageSize', pageSize.toString())
        .set('pageNumber', pageNumber.toString());

      if (latitude && longitude) {
        params = params
          .set('latitude', latitude.toString())
          .set('longitude', longitude.toString());
      } else {
        params = params
          .set('latitude', this.DEFAULT_LAT)
          .set('longitude', this.DEFAULT_LONG);
      }

      return this.http.get<RecommendedRestaurantResponse>(this.restaurantUrl + '/recommended', {params});
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
          } else if (b.price == null) {
            return -1;
          } else {
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
