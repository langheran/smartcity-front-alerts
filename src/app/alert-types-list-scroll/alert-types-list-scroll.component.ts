import {Component, EventEmitter, Inject, NgZone, OnInit} from '@angular/core';
import {AlertType} from "../alert-type";
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommunicationService} from "../services/communication-service";

@Component({
  selector: 'app-alert-types-list-scroll',
  templateUrl: './alert-types-list-scroll.component.html',
  styleUrls: ['./alert-types-list-scroll.component.scss'],
  inputs: ['alertTypesList'],
  outputs: ['onAlertTypeSelected']
})
export class AlertTypesListScrollComponent implements OnInit {
  onAlertTypeSelected: EventEmitter<AlertType> = new EventEmitter();
  alertTypesList: AlertType[];
  colNumber;
  selectedAlertType: AlertType;

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService, private router: Router, private route: ActivatedRoute, private _communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.alertTypesList = this.orion.getAlertTypes();
  }

  selectAlertTypeByName(alertTypeName: string) {
    if (!alertTypeName)
      this.selectedAlertType = null;
    else{
        this.selectedAlertType = this.orion.getAlertTypeByName(alertTypeName);
    }
  }

  hideAlerts(){
    this.router.navigate(['/']);
    this.selectedAlertType = null;
  }

  selectAlertType(alertType: AlertType) {
    this.onAlertTypeSelected.emit(alertType);
    var prevSelectedAlertTypeName="";
    if(this.selectedAlertType)
      prevSelectedAlertTypeName=this.selectedAlertType.name;
    this.selectedAlertType = JSON.parse(JSON.stringify(alertType));
    if(this.selectedAlertType.sendImmediately)
    {
      this._communicationService.mapContent.getCurrentAddress().subscribe((address: string) => {
          this.orion.submitAlert(alertType, alertType, '', address).subscribe(r=>{
            
            this.hideAlerts();
          });
        }
      );
    }
    else
    {
      if(prevSelectedAlertTypeName && prevSelectedAlertTypeName==alertType.name)
      {
        this.hideAlerts();
      }
    }
  }
}

