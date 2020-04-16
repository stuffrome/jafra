import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurant} from '../models/restaurant';
import {SortType} from '../models/enums/sort-type.enum';
import {RestaurantDetails} from '../models/details/restaurant-details';
import {RecommendedRestaurantResponse} from '../models/backend-response/recommended-restaurant-response';
import {ConfigurationService} from './config/configuration.service';

@Injectable()
export class RestaurantService {

  private readonly restaurantUrl: string;
  private readonly visitedUrl: string;
  private readonly wishlistUrl: string;

  private readonly DEFAULT_LAT = '29.6516';
  private readonly DEFAULT_LONG = '-82.3248';

  constructor(
    private http: HttpClient,
    private config: ConfigurationService) {
    this.restaurantUrl = config.backendUrl() + '/restaurants';
    this.visitedUrl = config.backendUrl() + '/visited';
    this.wishlistUrl = config.backendUrl() + '/wishlist';
  }

  public findRestaurantsWith(term: string, latitude: number, longitude: number, sortType: SortType): Observable<Restaurant[]> {
    const username = sessionStorage.getItem('username');

    let params = new HttpParams()
      .set('username', username)
      .set('radius', '4000')
      .set('sort', sortType.toString());

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
    const username = sessionStorage.getItem('username');

    const params = new HttpParams()
      .set('username', username)
      .set('id', id);

    return this.http.get<RestaurantDetails>(this.restaurantUrl + '/details', {params});
  }

  public getRecommendedRestaurants(
    pageSize: number,
    pageNumber: number,
    latitude: number,
    longitude: number,
    sortType: SortType): Observable<RecommendedRestaurantResponse> {
      const username = sessionStorage.getItem('username');

      let params = new HttpParams()
        .set('username', username)
        .set('pageSize', pageSize.toString())
        .set('pageNumber', pageNumber.toString())
        .set('sort', sortType.toString());

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

  // Visited API

  public addRestaurantReview(id: string, rating: number) {
    const username = sessionStorage.getItem('username');

    const params = new HttpParams()
      .set('username', username)
      .set('restaurantId', id)
      .set('userRating', rating.toString());

    this.http.post(this.visitedUrl, '', {params}).subscribe();
  }

  public getReviewedRestaurants(): Observable<Restaurant[]> {
    const username = sessionStorage.getItem('username');

    const params = new HttpParams()
      .set('username', username);

    return this.http.get<Restaurant[]>(this.visitedUrl, {params});
  }

  // Wishlist API

  public addToWishlist(id: string) {
    const username = sessionStorage.getItem('username');

    const params = new HttpParams()
      .set('username', username)
      .set('restaurantId', id);

    this.http.post(this.wishlistUrl, '', {params}).subscribe();
  }

  public removeFromWishlist(id: string) {
    const username = sessionStorage.getItem('username');

    const params = new HttpParams()
      .set('username', username)
      .set('restaurantId', id);

    this.http.post(this.wishlistUrl + '/remove', '', {params}).subscribe();
  }

  public getWishlistRestaurants(): Observable<Restaurant[]> {
    const username = sessionStorage.getItem('username');

    const params = new HttpParams()
      .set('username', username);

    return this.http.get<Restaurant[]>(this.wishlistUrl, {params});
  }
}
