import {Component, Inject, OnInit} from '@angular/core';
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {AlertType} from "../alert-type";
import {Alert} from "../alert";
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
  alertTypeParent:AlertType;
  alertEventObservedDisplay:string;
  BTNwidth: any;
  BTNheight: any;
  alert:Alert;

  constructor(
    @Inject('OrionContextBroker') public orion: OrionContextBrokerService,
    private _communicationService: CommunicationService
) {}

  ngOnInit() {
    if(window.screen.width>=1000){
      this.BTNwidth = ""+((window.screen.width/8)-10)+"px";
      this.BTNheight = ""+(window.screen.height/4)+"px";
    }else{
      this.BTNwidth = ""+((window.screen.width/2)-30)+"px";
      this.BTNheight = ""+((window.screen.height/4))+"px";
    }

    this.orion.getAlertEventObservedDisplay(this.userAlert.category, this.userAlert.subCategory).subscribe(r=> {
        this.alertEventObservedDisplay =r;
      }
    );
    this.alertType = this.orion.getAlertTypeByName(this.userAlert.category);
    this.alertTypeParent =this.alertType;
    if(this.alertType.sendImmediately)
      this.alertTypeParent = this.orion.searchAlertByName(this.userAlert.subCategory);
    this.alert = this.orion.getAlertByName(this.userAlert.category, this.userAlert.subCategory);
  }

  gotoMarker(){
    this._communicationService.setMapMarker({
      lat: this.userAlert.location.coordinates[0],
      lng: this.userAlert.location.coordinates[1]
    });
  }
}
