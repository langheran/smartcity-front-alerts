import {Component, EventEmitter, Inject, NgZone, OnInit} from '@angular/core';
import {AlertType} from "../alert-type";
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommunicationService} from "../services/communication-service";
import {DialogsService} from "../services/dialogs-service";
import {tick} from "@angular/core/testing";
import {fakeAsync} from "@angular/core/testing";

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

  showAutoCloseMessage(title, message, seconds) {
    this.dialogsService
      .timerMessage(title, message, seconds)
      .subscribe(res => {
        if ("undefined" === typeof res)
          res = false;
        this.hideAlerts();
      });
  }

  selectAlertType(alertType: AlertType) {
    this.onAlertTypeSelected.emit(alertType);
    var prevSelectedAlertTypeName = "";
    if (this.selectedAlertType)
      prevSelectedAlertTypeName = this.selectedAlertType.name;
    this.selectedAlertType = JSON.parse(JSON.stringify(alertType));
    if (this.selectedAlertType.sendImmediately) {
      this.orion.submitAlert(alertType, alertType, '', this._communicationService.address).subscribe(r=>{
        this.showAutoCloseMessage('Alert sent!', 'Alert '+alertType.name+' was sent. Closing in 3 seconds. Thanks!', 3000);
        this.hideAlerts();
      });
    }
    else {
      if (prevSelectedAlertTypeName && prevSelectedAlertTypeName == alertType.name) {
        this.hideAlerts();
      }
    }
  }
}

