import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertsAppComponent } from './app.component';
import { AlertTypeComponent } from './alert-type/alert-type.component';
import { MapSmartSDKComponent } from './map-smart-sdk/map-smart-sdk.component';
import { AlertTypesListComponent } from './alert-types-list/alert-types-list.component';
import {RoutesRoutingModule} from "./routes/routes-routing.module";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from "./material/material.module";
import {MaterialModule, MdDialogModule} from "@angular/material";
import { OrionContextBrokerService } from './services/orion-context-broker-service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  AlertThanksDialog,
  AlertTypeAlertsListComponent
} from './alert-type-alerts-list/alert-type-alerts-list.component';
import { AlertComponent } from './alert/alert.component';
import {AgmCoreModule} from 'angular2-google-maps/core';

import {FormsModule} from "@angular/forms";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import { MapContentComponent } from './map-content/map-content.component';
import {UtilityService} from "./utility-service";
import {LocationService} from "./services/location-service";
import {UserAlertsListComponent} from './user-alerts-list/user-alerts-list.component';
import {NewlinePipe, TruncatePipe} from "app/pipes";
import { MainMenuComponent } from './template/main-menu/main-menu.component';
import { TopMenuComponent } from './template/top-menu/top-menu.component';
import { FooterComponent } from './template/footer/footer.component';
import { AlertTypesListScrollComponent } from './alert-types-list-scroll/alert-types-list-scroll.component';
import {CommunicationService} from "./services/communication-service";
import {HttpService} from "./services/http-service";
import { BackTopMenuComponent } from './template/back-top-menu/back-top-menu.component';
import {DialogsService} from "./services/dialogs-service";
import {ConfirmDialogComponent} from "./template/confirm-dialog/confirm-dialog.component";
import { AboutComponent } from './about/about.component';
import { HowToEnableGeolocationComponent } from './about/how-to-enable-geolocation/how-to-enable-geolocation.component';

UtilityService.initToISOString();

@NgModule({
  declarations: [
    AlertsAppComponent,
    AlertTypeComponent,
    MapSmartSDKComponent,
    AlertTypesListComponent,
    AlertTypeAlertsListComponent,
    AlertComponent,
    MapContentComponent,
    AlertThanksDialog,
    UserAlertsListComponent,
    NewlinePipe,
    MainMenuComponent,
    TopMenuComponent,
    FooterComponent,
    AlertTypesListScrollComponent,
    TruncatePipe,
    BackTopMenuComponent,
    ConfirmDialogComponent,
    AboutComponent,
    HowToEnableGeolocationComponent
  ],
  imports: [
    BrowserModule,

    FormsModule,
    HttpModule,

    RoutesRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBk0YKTy49Sy8jpfqQzEqNLkb2Ju8-sWVk'}),

    FlexLayoutModule,
    MdDialogModule
  ],
  entryComponents: [
    AlertThanksDialog,
    ConfirmDialogComponent,
  ],
  providers: [
    LocationService,
    { provide: 'OrionContextBroker', useClass: OrionContextBrokerService },
    CommunicationService,
    {
      provide: Http,
      useFactory: HttpServiceFactory
      , deps: [XHRBackend, RequestOptions]
    },
    DialogsService
  ],
  bootstrap: [AlertsAppComponent]
})
export class AlertsAppModule { }

export function HttpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

