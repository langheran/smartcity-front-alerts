import {Component, NgZone, OnInit} from '@angular/core';

import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import {Observable} from "rxjs/Observable";
import {LocationService} from "../location-service";
import {PlatformLocation} from "@angular/common";

declare var google: any;

@Component({
  selector: 'app-map-content',
  template: ' '
})
export class MapContentComponent implements OnInit {
  map: any;
  cityCircle: any;
  lat: number;
  lng: number;
  originalPosition: Coordinates;

  constructor(public mapApiWrapper: GoogleMapsAPIWrapper,
              private locationService: LocationService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.locationService.getLocation().subscribe(loc => {
        this.lat = loc.latitude;
        this.lng = loc.longitude;
        this.originalPosition = loc;
        this.mapApiWrapper.getNativeMap()
          .then((map) => {
            this.map = map;
            this.gotoPosition(this.lat, this.lng);
          });
      }, error => console.log('error', error),
      () => console.log('completed'));
  }

  resize() {
    if ("undefined" === typeof google)
      return;
    if ("undefined" === typeof this.map)
      return;
    google.maps.event.trigger(this.map, "resize");
  }

  getCurrentAddress() {
    let geocoder = new google.maps.Geocoder;
    var latlng = {lat: this.lat, lng: this.lng};
    return Observable.create(observer => {
      geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            observer.next(results[0].formatted_address);
          } else {
            observer.next('No results found');
          }
        } else {
          observer.next('Geocoder failed due to: ' + status);
        }
        observer.complete();
      })
    });
  }

  gotoCenter() {
    this.gotoPosition(this.originalPosition.latitude, this.originalPosition.longitude, true);
  }

  gotoPosition(lat: number, lng: number, showCircle?: Boolean) {
    if ("undefined" === typeof google)
      return;
    let position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    if (this.cityCircle || !showCircle) {
      if (this.cityCircle)
        this.cityCircle.setMap(null);
      this.cityCircle = null;
    }
    else {
      this.cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: position,
        radius: (10000 / (this.map.getZoom()))
      });
    }
  }
}
