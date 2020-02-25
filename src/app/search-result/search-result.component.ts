import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../models/restaurant';
import {RestaurantService} from '../services/restaurant.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SortType} from '../enums/sort-type.enum';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  restaurants: Restaurant[];
  sortType: SortType;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getRestaurants();
      }
    });
  }

  ngOnInit() {
    this.sortType = SortType.DISTANCE;
    this.getRestaurants();
  }

  getRestaurants() {
    const categories: string = this.route.snapshot.paramMap.get('searchValue');
    this.restaurantService.findRestaurantsWith(categories).subscribe(res => {
      this.restaurants = res;
      this.sortRestaurants();
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
