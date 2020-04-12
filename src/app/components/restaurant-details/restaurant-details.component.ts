import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../services/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {RestaurantDetails} from '../../models/details/restaurant-details';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurantDetails: RestaurantDetails;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRestaurantDetails();
  }

  getRestaurantDetails() {
    const id: string = this.route.snapshot.paramMap.get('id');

    this.restaurantService.getRestaurantDetails(id).subscribe(details => {
      this.restaurantDetails = details;
    });
  }

}
