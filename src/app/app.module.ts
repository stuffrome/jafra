import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RestaurantService } from './services/restaurant.service';
import {FormsModule} from '@angular/forms';
import { SearchResultComponent } from './search-result/search-result.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { RatingComponent } from './rating/rating.component';
import {AuthHttpInterceptorService} from './services/auth-http-interceptor.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchResultComponent,
    RestaurantDetailsComponent,
    RecommendationsComponent,
    RatingComponent,
    LoginComponent
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
