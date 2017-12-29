import {
  Component, NgModule, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener,
  Inject
} from '@angular/core';
import {GoogleMapsAPIWrapper, MapsAPILoader} from "angular2-google-maps/core";
import {LocationService} from "../services/location-service";
import {CommunicationService} from "../services/communication-service";
import {ActivatedRoute, NavigationEnd, Router, CanActivate, NavigationStart} from "@angular/router";
import {PlatformLocation} from "@angular/common";
import {logger} from "codelyzer/util/logger";
import {OrionContextBrokerService} from "../services/orion-context-broker-service";

import {DialogsService} from "app/services/dialogs-service";
import {LoginService} from "../core/services/login/login.service";
import {constants} from "../core/common/constants";

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-map-smart-sdk',
  templateUrl: './map-smart-sdk.component.html',
  styleUrls: ['./map-smart-sdk.component.scss'],
  providers: [GoogleMapsAPIWrapper]
})
export class MapSmartSDKComponent implements OnInit {
  url_img: string;
  height: number;
  @ViewChild('mapContent') mapContent;
  @ViewChild('fillContentDiv') fillContentDiv;
  @ViewChild('alertTypesListScroll') alertTypesListScroll;
  @ViewChild('topMenu') topMenu;
  appSocialMediaGoogleMapMarker: string;
  markerLatitude: number = 0;
  markerLongitude: number = 0;
  marker: any;
  centerMap: boolean = true;
  mapAlreadyLoaded:boolean=false;

  selectedAlertTypeName: string;

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService,
              private locationService: LocationService,
              private el: ElementRef,
              private cd: ChangeDetectorRef,
              private _communicationService: CommunicationService,
              private router: Router,
              private route: ActivatedRoute,
              location: PlatformLocation,
              private dialogsService: DialogsService,
              public _loader: MapsAPILoader,
              private loginService: LoginService
  ) {
    location.onPopState(() => {
      document.querySelector('body').classList.remove('push-right');
    });
    _communicationService.windowResized$.subscribe(
      change => {
        this.onResize(null);
      });
    this._communicationService.mapMarkerSet$.subscribe(
      marker => {
        this.marker = marker;
        if(this.mapAlreadyLoaded)
          this.setAlertMarker(marker);
      });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertTypesListScroll.selectAlertTypeByName();
        if (event.url === '/' || event.url === '/map') {
          this.centerMap = true;
        } else {
          this.centerMap = false;
        }
      }
      if (event instanceof NavigationEnd) {
        document.querySelector('body').classList.remove('push-right');
        setTimeout(() => this.onResize(null), 100);
        if (event.url === '/' || event.url === '/map') {
          this.alertTypesListScroll.selectAlertTypeByName();
        }
        // console.log(event);
      }
    });
  }

  ngOnDestroy() {

  }

  openDailog() {
    this.dialogsService
      .confirm('Location tracking must be enabled in order to view this website', 'Do you want to view instructions on how to enable it?')
      .subscribe(res => {
        if ("undefined" === typeof res)
          res = false;

      });
  }

  ngOnInit() {
    this.url_img = "../assets/img/big.svg";
  }

  hideAlerts() {
    this.router.navigate(['/']);
  }

  hideMenu($event) {
    if ($(this.topMenu.toggleSidebarButton.nativeElement).css("display") != "none") {
      const dom: any = document.querySelector('body');
      dom.classList.remove('push-right');
      $event.stopPropagation();
    }
  }

  onErrorDialogClosed($event) {
    if ($event)
      this.router.navigate(['/about/HowToEnableGeolocation'])
    else
      location.reload();
  }

  mapLoaded($event) {
    this.mapAlreadyLoaded=true;
    if (this.marker) {
      this.setAlertMarker(this.marker);
      this.marker = null;
    }
  }

  ngAfterContentChecked() {
    this.onResize(null);
    if (this.route.firstChild)
      this.route.firstChild.params.subscribe(p => {
        if (p.name)
          if (!this.selectedAlertTypeName || p.name != this.selectedAlertTypeName) {
            this.alertTypesListScroll.selectAlertTypeByName(p.name);
            this.selectedAlertTypeName = p.name;
          }
      });
  }

  setAlertMarker($marker) {
    if ($marker.icon)
      this.appSocialMediaGoogleMapMarker = $marker.icon;
    else
      this.appSocialMediaGoogleMapMarker = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0000FF",
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34));
    this.markerLatitude = parseFloat($marker.lat);
    this.markerLongitude = parseFloat($marker.lng);
    this.mapContent.gotoPosition($marker.lat, $marker.lng);
  }

  onAlertTypeSelected($event) {
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
    this.markerLatitude = -1;
    this.markerLongitude = -1;
    this.mapContent.gotoCenter();
  }
}
