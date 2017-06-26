import {Component, OnInit} from '@angular/core';
import {AlertType} from "../alert-type";

@Component({
  selector: 'app-alert-type',
  templateUrl: './alert-type.component.html',
  styleUrls: ['./alert-type.component.css'],
  inputs: ['alertType'],
  host: {
    "[style.minHeight]":"'100%'",
    "[style.minWidth]":"'100%'",
    "[style.display]":"'flex'",
  }
})
export class AlertTypeComponent implements OnInit {
  alertType: AlertType

  constructor() {
  }

  ngOnInit() {
  }
}
