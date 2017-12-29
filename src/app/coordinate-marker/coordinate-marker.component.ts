import {Component, Inject, OnInit} from '@angular/core';
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {ActivatedRoute} from "@angular/router";
import {CommunicationService} from "../services/communication-service";
import {MapsAPILoader} from "angular2-google-maps/core";

declare var google: any;

@Component({
  selector: 'app-coordinate-marker',
  templateUrl: './coordinate-marker.component.html',
  styleUrls: ['./coordinate-marker.component.scss']
})
export class CoordinateMarkerComponent implements OnInit {
  userAlert: any;
  alertId: string;

  constructor(private route: ActivatedRoute, @Inject('OrionContextBroker') public orion: OrionContextBrokerService, private communicationService: CommunicationService, public _loader: MapsAPILoader) {

  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.route.params.subscribe(p => {
        this.alertId = p.alertId;
        this.setMarker(p.alertId);
      }
    );
  }

  setMarker(id)
  {
    this.orion.getAlertsById(id).subscribe(result => {
      this._loader.load().then(() => {
        var pinColor = "0000FF";
        var pinImage = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34));
        // var pinImage = {
        //   url:"../assets/img/"+result[0].alertType.value+"/"+result[0].eventObserved.value+".svg"
        //       url: 'data:image/svg+xml;utf-8, \
        // <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> \
        //   <path fill="blue" stroke="white" stroke-width="1" d="M3.5 3.5h25v25h-25z" ></path> \
        // </svg>'
        // <use xlink:href="'+"../assets/img/"+result[0].alertType.value+"/"+result[0].eventObserved.value+".svg"+'"/>\
        //   ,
        //   scaledSize: new google.maps.Size(64, 64)
        // };
        // var pinImage="../assets/img/"+result[0].alertType.value+"/"+result[0].eventObserved.value+".svg";
        this.userAlert = result[0];
        var latitude = result[0].location.coordinates[0];
        var longitude = result[0].location.coordinates[1];
        this.communicationService.setMapMarker({
          lat: latitude,
          lng: longitude,
          icon: pinImage//"../assets/img/"+result[0].alertType.value+"/"+result[0].eventObserved.value+".svg"
        });
      });
    });
  }

}
