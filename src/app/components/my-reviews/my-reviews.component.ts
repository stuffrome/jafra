import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {RestaurantService} from '../../services/restaurant.service';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(
    private restaurantService: RestaurantService,
    private locationService: LocationService
  ) {
  }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.locationService.getLocation().then(coordinates => {
      this.restaurantService.getReviewedRestaurants()
        .subscribe(res => {
          this.restaurants = res;
        });
    });
  }

}
