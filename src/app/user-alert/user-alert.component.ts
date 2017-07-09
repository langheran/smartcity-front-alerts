import {Component, Inject, OnInit} from '@angular/core';
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {AlertType} from "../alert-type";

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

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService) {}

  ngOnInit() {
    this.orion.getAlertEventObservedDisplay(this.userAlert.alertType.value, this.userAlert.eventObserved.value).subscribe(r=> {
        this.alertEventObservedDisplay =r;
      }
    );
    this.alertType = this.orion.getAlertTypeByName(this.userAlert.alertType.value);
  }

}
