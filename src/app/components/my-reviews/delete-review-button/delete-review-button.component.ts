import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/restaurant';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-delete-review-button',
  templateUrl: './delete-review-button.component.html',
  styleUrls: ['./delete-review-button.component.css']
})
export class DeleteReviewButtonComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
  }

  deleteReview() {
    this.restaurantService.addRestaurantReview(this.restaurant.id, 0);
  }

}
