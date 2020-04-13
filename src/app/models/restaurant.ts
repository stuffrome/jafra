import { Category } from './category';
import {Price} from './enums/price.enum';

export class Restaurant {
  id: string;
  alias: string;
  name: string;
  imageUrl: string;
  isClosed: boolean;
  reviewCount: number;
  categories: Category[];
  rating: number;
  price: Price;
  distance: number;
  userRating: number;
  userReviewDate: Date;
  wishList: boolean;
  visited: boolean;
}
