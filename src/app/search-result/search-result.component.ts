import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import {Router, ActivatedRoute, NavigationStart, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  restaurants: Restaurant[];



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
    this.getRestaurants();
  }

  getRestaurants() {
    const categories: string = this.route.snapshot.paramMap.get('searchValue');
    this.restaurantService.findRestaurantsMatching(categories).subscribe(res => {
      this.restaurants = res;
    });
  }

}
