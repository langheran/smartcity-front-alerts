import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.scss'],
  inputs:['userAlert']
})
export class UserAlertComponent implements OnInit {
  userAlert: any;
  constructor() {}

  ngOnInit() {
  }

}
