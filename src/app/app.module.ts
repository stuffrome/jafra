import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RestaurantService } from './services/restaurant.service';
import {FormsModule} from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { RatingComponent } from './components/rating/rating.component';
import {AuthHttpInterceptorService} from './services/auth/auth-http-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WishlistButtonComponent } from './components/wishlist/wishlist-button/wishlist-button.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { DeleteReviewButtonComponent } from './components/my-reviews/delete-review-button/delete-review-button.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchResultComponent,
    RestaurantDetailsComponent,
    RecommendationsComponent,
    RatingComponent,
    LoginComponent,
    PageNotFoundComponent,
    WishlistComponent,
    WishlistButtonComponent,
    MyReviewsComponent,
    DeleteReviewButtonComponent,
    RegistrationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    RestaurantService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
