import {Component, NgModule, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener} from '@angular/core';
import {GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {LocationService} from "../services/location-service";
import {CommunicationService} from "../services/communication-service";
import {ActivatedRoute, NavigationEnd, Router, CanActivate} from "@angular/router";
import {PlatformLocation} from "@angular/common";
import {logger} from "codelyzer/util/logger";

declare var google: any;

@Component({
  selector: 'app-map-smart-sdk',
  templateUrl: './map-smart-sdk.component.html',
  styleUrls: ['./map-smart-sdk.component.scss'],
  providers: [GoogleMapsAPIWrapper]
})
export class MapSmartSDKComponent implements OnInit {
  height: number;
  @ViewChild('mapContent') mapContent;
  @ViewChild('fillContentDiv') fillContentDiv;
  @ViewChild('alertTypesListScroll') alertTypesListScroll;

  constructor(private locationService: LocationService, private el: ElementRef, private cd: ChangeDetectorRef, private _communicationService: CommunicationService, private _router: Router, private _route: ActivatedRoute, location: PlatformLocation) {
    location.onPopState(() => {
      document.querySelector('body').classList.remove('push-right');
    });
    _communicationService.windowResized$.subscribe(
      text => {
        this.onResize(null);
      });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.onResize(null), 100);
        if(event.url==="/")
          this.alertTypesListScroll.selectedAlertType=null;
        // console.log(event);
      }
    });
  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this._communicationService.mapContent = this.mapContent;
  }

  hideAlerts() {
    this._router.navigate(['/']);
  }

  ngAfterContentChecked() {
    this.onResize(null);
  }

  componentAdded($event) {
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = this.fillContentDiv.nativeElement.offsetHeight;
    this.mapContent.resize();
  }

  gotoCenter() {
    this.mapContent.gotoCenter();
  }
}

