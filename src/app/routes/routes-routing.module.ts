import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapSmartSDKComponent} from "../map-smart-sdk/map-smart-sdk.component";
import {AlertTypesListComponent} from "../alert-types-list/alert-types-list.component";
import {AlertTypeAlertsListComponent} from "../alert-type-alerts-list/alert-type-alerts-list.component";
import {UserAlertsListComponent} from "../user-alerts-list/user-alerts-list.component";
import {AboutComponent} from "../about/about.component";
import {HowToEnableGeolocationComponent} from "../about/how-to-enable-geolocation/how-to-enable-geolocation.component";
import {ContactUsComponent} from "../about/contact-us/contact-us.component";
import {CoordinateMarkerComponent} from "../coordinate-marker/coordinate-marker.component";

const routes: Routes = [
<<<<<<< HEAD
  {
    path: '', redirectTo: 'map', pathMatch: 'full'
=======
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map' , component: MapSmartSDKComponent,
  children:[
    // {path: '', redirectTo: '', pathMatch: 'full'},
    {path: ':name', component: AlertTypeAlertsListComponent},
    {path: 'viewAlert/:alertId', component: CoordinateMarkerComponent},
  ]
>>>>>>> 80409101230b1413c8f773517b2aa1e844ad17f8
  },
  {
    path: 'map' , component: MapSmartSDKComponent
  },
  {
    path: 'AlertTypeAlertsList/:name/:address', component: AlertTypeAlertsListComponent
  },
  {
    path: 'about', component: AboutComponent,
    children:[
      { path : '', component : ContactUsComponent },
      {path: 'HowToEnableGeolocation', component: HowToEnableGeolocationComponent},
    ]
  },
  {path: 'userAlerts', component: UserAlertsListComponent},
  {path: '', component: UserAlertsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true} )],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
