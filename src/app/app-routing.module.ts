import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {RestaurantDetailsComponent} from './components/restaurant-details/restaurant-details.component';
import {RecommendationsComponent} from './components/recommendations/recommendations.component';
import {RatingComponent} from './components/rating/rating.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {MyReviewsComponent} from './components/my-reviews/my-reviews.component';
import {RegistrationComponent} from './components/registration/registration.component';


const routes: Routes = [
  { path: '', redirectTo: '/recommendations', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuardService] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuardService] },
  { path: 'reviews', component: MyReviewsComponent, canActivate: [AuthGuardService] },
  { path: 'search/:searchValue', component: SearchResultComponent, canActivate: [AuthGuardService] },
  { path: 'details/:id', component: RestaurantDetailsComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
