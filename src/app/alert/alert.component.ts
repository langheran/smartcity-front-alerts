import {Component, EventEmitter, HostListener, OnInit, ViewChild} from '@angular/core';
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
  url_img: string;
  alert: Alert;
  onSelect: EventEmitter<Alert> = new EventEmitter();
  truncateLength: number;
  @ViewChild('mdCardContent') mdCardContent;

  constructor() {
  }

  ngOnInit() {
    console.log(this.alert.icon);
    this.url_img =  "../assets/img/TrafficJam/"+this.alert.icon+".svg";
    this.changeTruncate();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeTruncate();
  }

  changeTruncate(){
    this.truncateLength = this.mdCardContent.nativeElement.offsetWidth > 126 ? 1000 : 25;
  }

  alertClick(){
    this.onSelect.emit(this.alert);
  }
}
