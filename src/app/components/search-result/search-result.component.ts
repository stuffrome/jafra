import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {RestaurantService} from '../../services/restaurant.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SortType} from '../../models/enums/sort-type.enum';
import {LocationService} from '../../services/location.service';

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
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getRestaurants();
      }
    });
    this.sortType = SortType.RELEVANCE;
  }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    const term: string = this.route.snapshot.paramMap.get('searchValue');

    this.locationService.getLocation().then(coordinates => {
      this.restaurantService.findRestaurantsWith(term, coordinates.latitude, coordinates.longitude).subscribe(res => {
        this.restaurants = res;
      });
    });
  }


  // Sorting

  sortByRelevance() {
    this.sortType = SortType.RELEVANCE;
    this.getRestaurants();
  }

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
