import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {SortType} from '../../models/enums/sort-type.enum';
import {RestaurantService} from '../../services/restaurant.service';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  restaurants: Restaurant[];
  noRestaurants: boolean;

  constructor(
    private restaurantService: RestaurantService,
    private locationService: LocationService
  ) {
    this.restaurants = [];
    this.noRestaurants = false;
  }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.locationService.getLocation().then(coordinates => {
      this.restaurantService.getWishlistRestaurants()
        .subscribe(res => {
          this.restaurants = res;
          if (this.restaurants.length === 0) {
            this.noRestaurants = true;
          } else {
            this.noRestaurants = false;
          }
        });
    });
  }
}
