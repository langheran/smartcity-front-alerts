import { Directive, Input } from '@angular/core';
import {
  GoogleMapsAPIWrapper,
  MapsAPILoader,
  MarkerManager,
  SebmGoogleMapMarker
} from 'angular2-google-maps/core';


declare var google: any;

@Directive({
  selector: '[appSocialMediaGoogleMapMarker]'
})
export class SocialMediaGoogleMapMarkerDirective {
  @Input('appSocialMediaGoogleMapMarker') socialMediaImage: any;

  constructor(
    private gmapsApi: GoogleMapsAPIWrapper,
    private markerManager: MarkerManager,
    private sebmMarker: SebmGoogleMapMarker,
    private loader: MapsAPILoader
  ) {

  }
  ngOnInit() {
    this.loader.load().then(this.initMarker.bind(this));
  }

  ngOnChanges(){
    this.initMarker();
  }

  initMarker(){
    this.gmapsApi.getNativeMap().then(map => {
      this.markerManager.getNativeMarker(this.sebmMarker).then(marker => {
        if(!this.socialMediaImage)
          this.socialMediaImage=new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0000FF",
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));
        marker.setIcon(this.socialMediaImage);
        marker.setZIndex(9999999);
      });
    });
  }
}
