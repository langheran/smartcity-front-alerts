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

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService, private router: Router, private route: ActivatedRoute,private _communicationService: CommunicationService) {
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

  selectAlertType(alertType: AlertType) {

    this._communicationService.mapContent.getCurrentAddress().subscribe((address: string) => {
        //this.orion.submitAlert(this.alertType, this.currentAlert, description, address).subscribe(r=>{});
        //this.dir = address;
        this.router.navigate(['../AlertTypeAlertsList/'+alertType.name+'/'+address]);
      }
    );
    this.onAlertTypeSelected.emit(alertType);
    this.selectedAlertType = alertType;
  }
}
