import {Component, Inject, OnInit} from '@angular/core';
import {OrionContextBrokerService} from "../orion-context-broker-service";
import {PlatformLocation} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-alerts-list',
  templateUrl: './user-alerts-list.component.html',
  styleUrls: ['./user-alerts-list.component.scss']
})
export class UserAlertsListComponent implements OnInit {
  userAlerts: Array<any>;

  constructor(private router: Router, location: PlatformLocation, @Inject('OrionContextBroker') public orion: OrionContextBrokerService) {
    location.onPopState(() => {
      // this.router.navigate(['/']);
      this.router.navigateByUrl("/");
      // history.back()
    });
  }

  ngOnInit() {
    this.orion.getAlertsByUser().subscribe(j => {
      if (j)
        this.userAlerts = j.sort((n1:any, n2:any) => {
          if (n1.dateTime.value > n2.dateTime.value) {
            return -1;
          }
          if (n1.dateTime.value < n2.dateTime.value) {
            return 1;
          }
          return 0;
        });
    });
  }

}

