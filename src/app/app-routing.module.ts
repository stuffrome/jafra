import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchResultComponent} from './search-result/search-result.component';
import {RestaurantDetailsComponent} from './restaurant-details/restaurant-details.component';
import {RecommendationsComponent} from './recommendations/recommendations.component';
import {RatingComponent} from './rating/rating.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'search/:searchValue', component: SearchResultComponent },
  { path: 'details/:id', component: RestaurantDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
