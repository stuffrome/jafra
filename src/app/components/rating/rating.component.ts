import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {RestaurantService} from '../../services/restaurant.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() restaurant: Restaurant;
  rating: number;

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    if (this.restaurant.userRating > 0) {
      this.rating = this.restaurant.userRating;
    }
  }

  setRating(rating: number) {
    console.log('Setting rating for ' + this.restaurant.name + ' to ' + rating);
    this.rating = rating;
    this.restaurantService.addRestaurantReview(this.restaurant.id, rating);
  }

  ratingClass(index: number): string {
    let str = '';

    if (this.rating >= index) {
      str += 'fas ';
      switch (this.rating) {
        case 1:
          str += 'oneStar';
          break;
        case 2:
          str += 'twoStars';
          break;
        case 3:
          str += 'threeStars';
          break;
        case 4:
          str += 'fourStars';
          break;
        case 5:
          str += 'fiveStars';
          break;
        default:
          break;
      }
    }

    return str;
  }

}
