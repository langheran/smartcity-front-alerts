import {Component, EventEmitter, NgZone, OnInit} from '@angular/core';

import {GoogleMapsAPIWrapper, MapsAPILoader} from 'angular2-google-maps/core';
import {Observable} from "rxjs/Observable";
import {LocationService} from "../services/location-service";
import {PlatformLocation} from "@angular/common";
import {DialogsService} from "app/services/dialogs-service";
import {CommunicationService} from "../services/communication-service";

declare var google: any;

@Component({
  selector: 'app-map-content',
  template: ' ',
  outputs: ['onErrorDialogClosed']
})
export class MapContentComponent implements OnInit {
  map: any;
  cityCircle: any;
  lat: number;
  lng: number;
  originalPosition: Coordinates;
  onErrorDialogClosed: EventEmitter<boolean> = new EventEmitter();
  gotToCenter:boolean=false;

  constructor(public mapApiWrapper: GoogleMapsAPIWrapper,
              private locationService: LocationService, private dialogsService: DialogsService, private _communicationService: CommunicationService, public _loader: MapsAPILoader) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.locationService.trackLocation().subscribe(loc => {
        this.lat = loc.latitude;
        this.lng = loc.longitude;
        this.originalPosition = loc;
        this.mapApiWrapper.getNativeMap()
          .then((map) => {
            this.map = map;
            if(!this.gotToCenter) {
              this.gotoPosition(this.lat, this.lng);
              this.gotToCenter=true;
            }
            this.getCurrentAddress().subscribe((address: string) => {
                this._communicationService.address = address;
              }
            );
          });
      }, error => {
        console.log('error', error);
        if(!this.lng || !this.lat)
        this.dialogsService
          .confirm('Location tracking must be enabled in order to view this website', 'Do you want to view instructions on how to enable it?')
          .subscribe(res => {
            if ("undefined" === typeof res)
              res = false;
            this.onErrorDialogClosed.emit(res);
          });
      },
      () => {
        // console.log('completed')
      });
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
    }).share();
  }

  gotoCenter() {
    this.gotoPosition(this.originalPosition.latitude, this.originalPosition.longitude, true);
  }

  gotoPosition(lat: number, lng: number, showCircle?: Boolean) {
    this._loader.load().then(() => {
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
    });
  }
}
