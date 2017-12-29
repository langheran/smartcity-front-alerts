import {Component, Inject, OnInit} from '@angular/core';
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {AlertType} from "../alert-type";
import {CommunicationService} from "../services/communication-service";
import {CoordinateMarkerComponent} from "../coordinate-marker/coordinate-marker.component";

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.scss'],
  inputs:['userAlert']
})
export class UserAlertComponent implements OnInit {
  userAlert: any;
  alertType:AlertType;
  alertEventObservedDisplay:string;

  constructor(
    @Inject('OrionContextBroker') public orion: OrionContextBrokerService,
    private _communicationService: CommunicationService
) {}

  ngOnInit() {
    this.orion.getAlertEventObservedDisplay(this.userAlert.alertType, this.userAlert.eventObserved).subscribe(r=> {
        this.alertEventObservedDisplay =r;
      }
    );
    this.alertType = this.orion.getAlertTypeByName(this.userAlert.alertType);
  }

  gotoMarker(){
    this._communicationService.setMapMarker({
      lat: this.userAlert.location.coordinates[0],
      lng: this.userAlert.location.coordinates[1]
    });
  }
}
