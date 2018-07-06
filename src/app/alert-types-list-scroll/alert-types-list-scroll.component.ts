import {Component, EventEmitter, Inject, NgZone, OnInit} from '@angular/core';
import {AlertType} from "../alert-type";
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommunicationService} from "../services/communication-service";

import {DialogsService} from "../services/dialogs-service";
import {tick} from "@angular/core/testing";
import {fakeAsync} from "@angular/core/testing";
import {Alert} from "../alert";

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
  selectedAlertType: AlertType;

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService, private router: Router, private route: ActivatedRoute, private _communicationService: CommunicationService, private dialogsService: DialogsService) {
  }

  ngOnInit() {
    this.alertTypesList = this.orion.getAlertTypes();
  }

  selectAlertTypeByName(alertTypeName: string) {
    if (!alertTypeName)
      this.selectedAlertType = null;
    else {
      this.selectedAlertType = this.orion.getAlertTypeByName(alertTypeName);
    }
  }

  hideAlerts() {
    this.router.navigate(['/']);
    this.selectedAlertType = null;
  }

  selectAlertType(alertType: AlertType) {

    /*this._communicationService.mapContent.getCurrentAddress().subscribe((address: string) => {
        //this.orion.submitAlert(this.alertType, this.currentAlert, description, address).subscribe(r=>{});
        //this.dir = address;
        this.router.navigate(['../AlertTypeAlertsList/'+alertType.name+'/'+address]);
      }
    );*/


    this.onAlertTypeSelected.emit(alertType);
    var prevSelectedAlertTypeName = "";
    if (this.selectedAlertType)
      prevSelectedAlertTypeName = this.selectedAlertType.name;
    this.selectedAlertType = JSON.parse(JSON.stringify(alertType));
    if (this.selectedAlertType.sendImmediately) {
      this.orion.getAlertsByAlertType(alertType.name).subscribe(eventObserved => {
        this.dialogsService
          .timerConfirm(eventObserved[0].display+' alert will be sent in 5 seconds!', 'Are you agree?', 5000)
          .subscribe(res => {
            if ("undefined" === typeof res)
              res = false;
            if (res) {
              this.orion.submitAlert(alertType, eventObserved[0], '', this._communicationService.address, 'high').subscribe(r => {
                this.hideAlerts();
              });
            }
          });
      });
    } else {
      console.log("maickol rodriguez");
      console.log( this._communicationService.address );
      if (prevSelectedAlertTypeName && prevSelectedAlertTypeName == alertType.name) {
        this.hideAlerts();
      }
     this.router.navigate(['../AlertTypeAlertsList/'+ alertType.name + '/' + this._communicationService.address]);
    }
  }
}
