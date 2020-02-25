import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';

@Injectable()
export class RestaurantService {

  private restaurantUrl: string;

  constructor(private http: HttpClient) {
    // this.restaurantUrl = 'jafra-backend.herokuapp.com/restaurants';
    this.restaurantUrl = 'http://localhost:8080/restaurants';
  }

  public findRestaurantsMatching(categories: string): Observable<Restaurant[]> {
    let params = new HttpParams()
      .set('latitude', '29.6516')
      .set('longitude', '-82.3248')
      .set('radius', '4000');

    if (categories) {
      params = params.set('categories', categories);
    }

    return this.http.get<Restaurant[]>(this.restaurantUrl, {params});
  }
}
