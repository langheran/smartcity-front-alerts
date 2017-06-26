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
import { OrionContextBrokerService } from './orion-context-broker-service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  AlertThanksDialog,
  AlertTypeAlertsListComponent
} from './alert-type-alerts-list/alert-type-alerts-list.component';
import { AlertComponent } from './alert/alert.component';
import {AgmCoreModule} from 'angular2-google-maps/core';

import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { MapContentComponent } from './map-content/map-content.component';
import {UtilityService} from "./utility-service";
import {LocationService} from "./location-service";
import {UserAlertsListComponent} from './user-alerts-list/user-alerts-list.component';
import {NewlinePipe, TruncatePipe} from "app/pipes";
import { MainMenuComponent } from './template/main-menu/main-menu.component';
import { TopMenuComponent } from './template/top-menu/top-menu.component';
import { FooterComponent } from './template/footer/footer.component';
import { AlertTypesListScrollComponent } from './alert-types-list-scroll/alert-types-list-scroll.component';
import {CommunicationService} from "./communication-service";

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
    TruncatePipe
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
    AlertThanksDialog
  ],
  providers: [ LocationService, { provide: 'OrionContextBroker', useClass: OrionContextBrokerService }, CommunicationService ],
  bootstrap: [AlertsAppComponent]
})
export class AlertsAppModule { }