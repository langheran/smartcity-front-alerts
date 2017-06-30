import {Component, EventEmitter, Inject, NgZone, OnInit} from '@angular/core';
import {AlertType} from "../alert-type";
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService, private router: Router, private route: ActivatedRoute) {
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
    this.onAlertTypeSelected.emit(alertType);
    this.selectedAlertType = alertType;
  }
}

