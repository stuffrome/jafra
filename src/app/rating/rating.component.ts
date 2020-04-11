import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../models/restaurant';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() restaurant: Restaurant;
  rating: number;

  constructor() {
    this.rating = 0;
  }

  ngOnInit() {
  }

  setRating(rating: number) {
    console.log('Setting rating for ' + this.restaurant.name + ' to ' + rating);
    this.rating = rating;
    // Backend call to set rating here
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
