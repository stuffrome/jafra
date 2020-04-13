import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {SortType} from '../../models/enums/sort-type.enum';
import {Restaurant} from '../../models/restaurant';
import {RestaurantService} from '../../services/restaurant.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  restaurants: Restaurant[];
  sortType: SortType;

  readonly PAGE_SIZE = 10;
  currentPage: number;
  pageCount: number;

  // Fix for maintaining relevance
  recommendedSortedRestaurants: Restaurant[];

  constructor(
    private restaurantService: RestaurantService,
    private locationService: LocationService
  ) {
    this.sortType = SortType.RECOMMENDED;
    this.currentPage = 1;
  }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.locationService.getLocation().then(coordinates => {
      this.restaurantService
        .getRecommendedRestaurants(this.PAGE_SIZE, this.currentPage, coordinates.latitude, coordinates.longitude, this.sortType)
          .subscribe(res => {
            this.restaurants = res.restaurants;
            this.pageCount = 1 + Math.floor(res.numResults / this.PAGE_SIZE);
      });
    });
  }

  // Pagination

  changePage(i: number) {
    this.currentPage = i;
    this.getRestaurants();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.changePage(this.currentPage + 1);
    }
  }

  // Sorting

  sortByRecommended() {
    this.sortType = SortType.RECOMMENDED;
    this.getRestaurants();
  }

  sortByName() {
    this.sortType = SortType.NAME;
    this.getRestaurants();
  }

  sortByPrice() {
    this.sortType = SortType.PRICE;
    this.getRestaurants();
  }

  sortByDistance() {
    this.sortType = SortType.DISTANCE;
    this.getRestaurants();
  }

  sortByRating() {
    this.sortType = SortType.RATING;
    this.getRestaurants();
  }
}
