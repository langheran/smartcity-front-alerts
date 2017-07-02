import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class LocationService {
  latitude: number;
  longitude: number;
  locationWatchId: number;
  coordinatesObservable: Observable<Coordinates>

  getLocation(): Observable<Coordinates> {
    if (!this.coordinatesObservable)
      this.coordinatesObservable = Observable.create(observer => {
        if (window.navigator && window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
            (position) => {
              // console.log(position.coords);
              observer.next(position.coords);
              observer.complete();
            },
            (error) => observer.error(error),
            {
              enableHighAccuracy: true,
              timeout: 1000,
              maximumAge: 0
            }
          );
        } else {
          observer.error('Unsupported Browser');
        }
      });
    return this.coordinatesObservable;
  }

  trackLocation(): Observable<Coordinates> {
    if (!this.coordinatesObservable)
      this.coordinatesObservable = Observable.create(observer => {
        if (window.navigator && window.navigator.geolocation) {
          var self = this;
          if (this.locationWatchId)
            window.navigator.geolocation.clearWatch(this.locationWatchId);
          this.locationWatchId = window.navigator.geolocation.watchPosition(function (position) {
            self.latitude = position.coords.latitude;
            self.longitude = position.coords.longitude;
            observer.next(position.coords);
            // observer.complete();
            // console.log(position.coords);
          }, function (error) {
            observer.error(error)
          });
        } else {
          observer.error('Unsupported Browser');
        }
      });
    return this.coordinatesObservable;
  }
}

