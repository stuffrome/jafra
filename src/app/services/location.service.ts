import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  public getLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve(pos.coords);
      }, err => {
        reject(err);
        return null;
      }, {maximumAge: 60000, timeout: 5000, enableHighAccuracy: true});
    });
  }

}
