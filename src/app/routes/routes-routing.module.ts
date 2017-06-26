import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapSmartSDKComponent} from "../map-smart-sdk/map-smart-sdk.component";
import {AlertTypesListComponent} from "../alert-types-list/alert-types-list.component";
import {AlertTypeAlertsListComponent} from "../alert-type-alerts-list/alert-type-alerts-list.component";
import {UserAlertsListComponent} from "../user-alerts-list/user-alerts-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map' , component: MapSmartSDKComponent,
  children:[
    // {path: '', redirectTo: '', pathMatch: 'full'},
    {path: ':name', component: AlertTypeAlertsListComponent},
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

