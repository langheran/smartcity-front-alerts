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
  @Input('appSocialMediaGoogleMapMarker') socialMediaImage: string;

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
        marker.setIcon(this.socialMediaImage);
        marker.setZIndex(9999999);
      });
    });
  }
}
