import {
  Component, NgModule, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener,
  Inject
} from '@angular/core';
import {GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {LocationService} from "../services/location-service";
import {CommunicationService} from "../services/communication-service";
import {ActivatedRoute, NavigationEnd, Router, CanActivate, NavigationStart} from "@angular/router";
import {PlatformLocation} from "@angular/common";
import {logger} from "codelyzer/util/logger";
import {OrionContextBrokerService} from "../services/orion-context-broker-service";
import {AlertType} from "../alert-type";
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

  selectedAlertTypeName:string;

  constructor(@Inject('OrionContextBroker') public orion: OrionContextBrokerService, private locationService: LocationService, private el: ElementRef, private cd: ChangeDetectorRef, private _communicationService: CommunicationService, private router: Router, private route: ActivatedRoute, location: PlatformLocation) {
    location.onPopState(() => {
      document.querySelector('body').classList.remove('push-right');
    });
    _communicationService.windowResized$.subscribe(
      text => {
        this.onResize(null);
      });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertTypesListScroll.selectAlertTypeByName();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.onResize(null), 100);
        if (event.url === "/")
          this.alertTypesListScroll.selectAlertTypeByName();
        // console.log(event);
      }
    });
  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.url_img = "../assets/img/big.svg";
  }

  hideAlerts() {
    this.router.navigate(['/']);
  }

  hideMenu($event){
    if($(this.topMenu.toggleSidebarButton.nativeElement).css("display")!="none") {
      const dom: any = document.querySelector('body');
      dom.classList.remove('push-right');
      $event.stopPropagation();
    }
  }

  

  onErrorDialogClosed($event){
    if($event)
      this.router.navigate(['/about/HowToEnableGeolocation'])
    else
      location.reload();
  }

  ngAfterContentChecked() {
    this.onResize(null);
    if (this.route.firstChild)
      this.route.firstChild.params.subscribe(p => {
        if(!this.selectedAlertTypeName || p.name!=this.selectedAlertTypeName) {
          this.alertTypesListScroll.selectAlertTypeByName(p.name);
          this.selectedAlertTypeName=p.name;
        }
      });
  }

  onAlertTypeSelected($event)
  {
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
