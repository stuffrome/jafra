import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location.service';
import {SortType} from '../enums/sort-type.enum';
import {Restaurant} from '../models/restaurant';
import {RestaurantService} from '../services/restaurant.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  restaurants: Restaurant[];
  sortType: SortType;

  constructor(
    private restaurantService: RestaurantService,
    private locationService: LocationService
  ) {

  }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    const TEST_USER = 'test2';
    const TEST_PG_SIZE = 10;
    const TEST_PG_NUM = 1;

    const user = sessionStorage.getItem('username');

    this.locationService.getLocation().then(coordinates => {
      this.restaurantService.getRecommendedRestaurants(user, TEST_PG_SIZE, TEST_PG_NUM, coordinates.latitude, coordinates.longitude)
        .subscribe(res => {
          this.restaurants = res.restaurants;
      });
    });
  }


  // Sorting

  sortByName() {
    this.sortType = SortType.NAME;
    this.sortRestaurants();
  }

  sortByPrice() {
    this.sortType = SortType.PRICE;
    this.sortRestaurants();
  }

  sortByDistance() {
    this.sortType = SortType.DISTANCE;
    this.sortRestaurants();
  }

  sortRestaurants() {
    this.restaurants = this.restaurantService.sortRestaurants(this.restaurants, this.sortType);
  }

}
