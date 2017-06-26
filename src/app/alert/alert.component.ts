import {Component, EventEmitter, OnInit} from '@angular/core';
import {Alert} from "../alert";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  inputs: ['alert'],
  host: {
    "[style.minHeight]":"'100%'",
    "[style.minWidth]":"'100%'",
    "[style.display]":"'flex'",
  },
  outputs:['onSelect']
})
export class AlertComponent implements OnInit {
  alert: Alert
  onSelect: EventEmitter<Alert> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  alertClick(){
    this.onSelect.emit(this.alert);
  }
}

