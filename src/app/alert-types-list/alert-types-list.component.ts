import {Component, Inject, OnInit} from '@angular/core';
import {AlertType} from "../alert-type";
import {OrionContextBrokerService} from "../services/orion-context-broker-service";

@Component({
  selector: 'app-alert-types-list',
  templateUrl: './alert-types-list.component.html',
  styleUrls: ['./alert-types-list.component.css'],
  inputs: ['alertTypesList'],
  outputs: ['']
})
export class AlertTypesListComponent implements OnInit {
  alertTypesList: AlertType[];
  colNumber;

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService) {
  }

  ngOnInit() {
    this.alertTypesList = this.orion.getAlertTypes();
    this.onResize(null);
  }

  onResize(event) {
    this.colNumber = window.innerWidth > window.innerHeight ? 3 : 2;
  }
}
