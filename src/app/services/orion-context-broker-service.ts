import {Injectable, OnInit, Inject} from '@angular/core';
import {AlertType} from "../alert-type";
import {Alert} from "../alert";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {UtilityService} from "../utility-service";
import {Observable} from "rxjs/Observable";
import {LocationService} from "./location-service";
import {log} from "util";
import {DOCUMENT} from '@angular/platform-browser';
import {DialogsService} from "app/services/dialogs-service";
import {forEach} from "@angular/router/src/utils/collection";
import {LoginService} from "../core/services/login/login.service";

@Injectable()
export class OrionContextBrokerService {
  baseHref: string;

  constructor(public http: Http, private locationService: LocationService, @Inject(DOCUMENT) private document, private dialogsService: DialogsService, private loginService: LoginService) {

  }

  getAlertTypes(): AlertType[] {
    return [
      new AlertType("AsthmaAttacks", "Asthma attack", "AsthmaAttacks", true),
      new AlertType("TrafficJam", "Traffic jam", "TrafficJam"),
      new AlertType("Accident", "accident", "Accident"),
      new AlertType("WeatherCondition", "Wheater condition", "WeatherCondition"),
      new AlertType("Pollution", "High level of pollution", "HighLevelOfPollution"),
      new AlertType("Pollen", "Pollen", "Pollen"),
    ];
  }

  getAlertsByAlertType(alertTypeName: string): Observable<Alert[]> {
    var res: Observable<Alert[]>;
    switch (alertTypeName) {
      case "TrafficJam":
        res = this.http.get(document.location.protocol +'//'+ document.location.hostname + ':3000'  +'/api/alerts/TrafficJam').map((val, i) => <Alert[]>val.json());
        break;
      default:
        res = Observable.create(observer => {
          switch (alertTypeName) {
            case "TrafficJam":
              var arr =  [
                 new Alert("StandstillTrafficJam", "Standstill Traffic Jam", "StandstillTrafficJam"),
                 new Alert("HeavyTrafficJam", "Heavy Traffic Jam", "HeavyTrafficJam"),
                 new Alert("BumperToBumperTraffic", "Bumper to bumper traffic", "BumperToBumperTraffic"),
                 new Alert("ModerateTrafficJam", "Moderate Traffic Jam", "ModerateTrafficJam"),
                 new Alert("CarStoppedOnRoad", "Car Stopped On Road", "CarStoppedOnRoad"),
                 new Alert("Roadworks", "Roadworks", "Roadworks"),
                 new Alert("RoadClosed", "Road closed", "RoadClosed"),
                 new Alert("Pothole", "Pothole", "Pothole"),
               ];
               observer.next(arr);
            break;
            case "Accident":
              var arr = [
                new Alert("MinorAccident", "Minor Accident", "MinorAccident"),
                new Alert("CarAccident", "Accident", "CarAccident"),
                new Alert("Hazard On Road", "Hazard On Road", "HazardOnRoad"),
                new Alert("Assaults", "Assaults", "Assaults"),
                new Alert("Bikers injured", "Bikers injured", "BikersInjured"),
                new Alert("CarCrashes", "Car crashes", "CarCrashes"),
                new Alert("Personanimalrunover","Person/animal run over","MinorAccident")
              ];
              observer.next(arr);
              break;
            case "WeatherCondition":
              var arr = [
                new Alert("Rainfall", "Rain Fall", "Rain"),
                new Alert("TropicalDeression","Tropical Depresion","TropicalDepression"),
                new Alert("TropicalStorm","Tropical Storm","TropicalStorm"),
                new Alert("Tornado","Tornado","Tornado"),
                new Alert("Hurricane","Hurricane","Hurricane"),
                new Alert("Foggy", "Foggy", "Foggy"),
                new Alert("HighTemperature", "High temperature", "HighTemperature"),
                new Alert("LowTemperature", "Low temperature", "LowTemperature"),
              ];
              observer.next(arr);
              break;
            case "Pollution":
              var arr = [
                new Alert("Smog", "Visible smog", "VisibleSmog"),
                new Alert("volcanoes/industrial processes","volcanoes/industrial processes","Volcan"),
                new Alert("Aerosols, ash, dust, and fecal matter","Aerosols, ash, dust, and fecal matter","GasVehicular"),
                new Alert("Odors","Odors","OdorsGarbaage"),
                new Alert("Radioactive","Radioactive","RadioactiveNuclear")
              ];
              observer.next(arr);
              break;
            case "Pollen":
              var arr = [
                new Alert("Symptoms", "Symptoms or discomforts of users", "Symptoms"),
                new Alert("Sinuspressure","Sinus pressure","Sinuspressure"),
                new Alert("Runnynose","Runny nose","Runnynose"),
                new Alert("Wateryeyes","Watery eyes","Watereyes"),
                new Alert("Cough","Cough","Cough"),
                new Alert("Nasalcongestion","Nasal congestion","Nasalcongestion")
              ];
              observer.next(arr);
              break;
            case "AsthmaAttacks":
              var arr = [
                new Alert("AsthmaAttacks", "Asthma attack", "null"),
              ];
              observer.next(arr);
            break;
          }
        });
    }
    return res;
  }

  getAlertTypeByName(alertTypeName: string): AlertType {
    switch (alertTypeName) {
      case "TrafficJam":
        return new AlertType("TrafficJam", "Traffic jam", "traffic");
      case "CarAccident":
        return new AlertType("CarAccident", "Car accident", "directions_car");
      case "WeatherCondition":
        return new AlertType("WeatherCondition", "Weather condition", "wb_sunny");
      case "Pollution":
        return new AlertType("Pollution", "High level of pollution", "smoking_rooms");
      case "Pollen":
        return new AlertType("Pollen", "Pollen", "local_florist");
      case "AsthmaAttacks":
        return new AlertType("AsthmaAttacks", "Asthma attack", "local_pharmacy", true);
    }
  }

  getAlertEventObservedDisplay(alertTypeName:string, eventObserved: string): Observable<string>
  {
     return this.getAlertsByAlertType(alertTypeName).map((alerts)=>{
       var display:string;
       alerts.forEach((alert)=>{
         if(alert.name==eventObserved)
           display=alert.display;
       });
       return display;
       }
     );
  }

  submitAlert(alert: AlertType, eventObserved: Alert, description: string, address: string) {
    description=description.replace(/(?:\r\n|\r|\n)/g, '\\n');
    var date = new Date();

    var json={
      "data": [
        {
          "id": UtilityService.guid(),
          "type": "Alert",
          "alertType": alert.name,
          "eventObserved": eventObserved.name,
          "locationDescription": address,
          "location": {
            "type" : "Point",
            "coordinates": [this.locationService.latitude, this.locationService.longitude]
          },
          "dateTime": date.toISOString(),
          "description": description,
          "refUser": this.loginService.getLoggedUser().id,
          "refDevice": "Device1"
        }
      ],
      "subscriptionId": "57458eb60962ef754e7c0998"
    };

    var json2 = {
      "id": UtilityService.guid(),
      "type": "Alert",
      "alertType": {"type": "String", "value": alert.name},
      "eventObserved": {"type": "String", "value": eventObserved.name},
      "address": {
        "type": "String",
        "value": address
      },
      "location": {
        "type": "FIWARE::Location::NGSIv2",
        "value": {
          "georel": ["near", "minDistance:13500"],
          "geometry": "point",
          "coords": [[this.locationService.latitude, this.locationService.longitude]]
        }
      },
      "dateTime": {"type": "DateTime", "value": date.toISOString()},
      "description": {"type": "String", "value": description},
      "refUser": {"type": "String", "value": "https://account.lab.fiware.org/users/8"},
      "refDevice": {"type": "String", "value": ""}
    };

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    var source=
      Observable.forkJoin(
        this.http.post(
          "https://207.249.127.67:8443/back-sdk/alerts",
          JSON.stringify(
            json
          ),
          options
        ),
        this.http.post(
          "https://207.249.127.228:1027/v2/entities",
          JSON.stringify(
            json2
          ),
          options
        ),
        function (x) { return x; }
      ).finally(
      ()=>{
        this.showAutoCloseMessage('Alert sent!', 'Alert <b>'+alert.display + (alert.sendImmediately?'':' - ' + eventObserved.display) +'</b> was sent. </br></br> Thanks! :)', 3000);
      }
    );

    return source;
  }

  showAutoCloseMessage(title, message, seconds) {
    this.dialogsService
      .timerMessage(title, message, seconds)
      .subscribe(res => {
        if ("undefined" === typeof res)
          res = false;
      });
  }

  getAlertsByUser(): Observable<Alert[]> {
    // Firefox requires Accept
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get("https://207.249.127.228:1026/v2/entities/?type=Alert&limit=10&orderBy=!dateCreated").map((val, i) => {
      var res=<any[]>val.json();
      if(res){
        res.forEach((re)=>{
          if(re.description && re.description.value)
            re.description.value=re.description.value.replace("\\n", "\r\n");
        });
      }
      return res;
    });
  }

  getAlertsById(id:string): Observable<Alert> {
    // Firefox requires Accept
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get("https://207.249.127.228:1026/v2/entities/?type=Alert&limit=1&orderBy=!dateCreated&id="+id).map((val, i) => {
      var res=val.json();
      return res;
    });
  }
}
