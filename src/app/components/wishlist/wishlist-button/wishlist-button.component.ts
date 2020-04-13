import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/restaurant';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.css']
})
export class WishlistButtonComponent implements OnInit {

  @Input() restaurant: Restaurant;
  inWishlist: boolean;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
  }

  wishlistToggle() {
    if (this.restaurant.wishList) {
      this.restaurantService.removeFromWishlist(this.restaurant.id);
      this.restaurant.wishList = false;
    } else {
      this.restaurantService.addToWishlist(this.restaurant.id);
      this.restaurant.wishList = true;
    }
  }

}
