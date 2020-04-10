import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RestaurantService } from './services/restaurant.service';
import {FormsModule} from '@angular/forms';
import { SearchResultComponent } from './search-result/search-result.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchResultComponent,
    RestaurantDetailsComponent,
    RecommendationsComponent,
    RatingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
