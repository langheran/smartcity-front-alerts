import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class LocationService {
  latitude: number;
  longitude: number;
  locationWatchId: number;
  getLocationObservable : Observable<Coordinates>;
  trackLocationObservable : Observable<Coordinates>;

  getLocation(): Observable<Coordinates> {
    // if(!this.getLocationObservable)
    // this.getLocationObservable =
      return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(position.coords);
            observer.next(position.coords);
            observer.complete();
          },
          (error) => {
            observer.error(error)
            observer.complete();
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 1000
          }
        );
      } else {
        observer.error('Unsupported Browser');
        observer.complete();
      }
    }).share();
    // return this.getLocationObservable;
  }

  trackLocation(): Observable<Coordinates> {
    // if(!this.trackLocationObservable)
    //   this.trackLocationObservable =
       return Observable.create(observer => {
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
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 1000
          });
      } else {
        observer.error('Unsupported Browser');
      }
    }).share();
    // return this.trackLocationObservable;
  }
}

