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

@Injectable()
export class OrionContextBrokerService {
  baseHref: string;

  constructor(public http: Http, private locationService: LocationService, @Inject(DOCUMENT) private document, private dialogsService: DialogsService) {

  }

  getAlertTypes(): AlertType[] {
    return [
      new AlertType("Asthma", "Asthma attacks", "AsthmaAttacks", true),
      new AlertType("TrafficJam", "Traffic jam", "TrafficJam"),
      new AlertType("CarAccident", "Car accident", "CarAccident"),
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
            case "CarAccident":
              var arr = [
                new Alert("MinorAccident", "Minor Accident", "MinorAccident"),
                new Alert("CarAccident", "Car Accident", "CarAccident"),
                new Alert("Hazard On Road", "Hazard On Road", "HazardOnRoad"),
                new Alert("Assaults", "Assaults", "Assaults"),
                new Alert("Bikers injured", "Bikers injured", "BikersInjured"),
                new Alert("CarCrashes", "Car crashes", "CarCrashes"),
              ];
              observer.next(arr);
              break;
            case "WeatherCondition":
              var arr = [
                new Alert("Rain", "Rain", "Rain"),
                new Alert("Sunny", "Sunny", "Sunny"),
                new Alert("Cloud", "Cloud", "Cloud"),
                new Alert("Foggy", "Foggy", "Foggy"),
                new Alert("HighTemperature", "High temperature", "HighTemperature"),
                new Alert("LowTemperature", "Low temperature", "LowTemperature"),
              ];
              observer.next(arr);
              break;
            case "Pollution":
              var arr = [
                new Alert("VisibleSmog", "Visible smog", "VisibleSmog"),
              ];
              observer.next(arr);
              break;
            case "Pollen":
              var arr = [
                new Alert("Symptoms", "Symptoms or discomforts of users", "Symptoms"),
              ];
              observer.next(arr);
              break;
            case "Asthma":
              var arr = [
                new Alert("AsthmaAttack", "Asthma attack", "AsthmaAttack"),
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
      case "Asthma":
        return new AlertType("Asthma", "Asthma attacks", "local_pharmacy", true);
    }
  }

  submitAlert(alert: AlertType, eventObserved: Alert, description: string, address: string) {
    description=description.replace(/(?:\r\n|\r|\n)/g, '\\n');
    var date = new Date();
    var json = {
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
    }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(
      "https://207.249.127.228:1027/v2/entities",
      JSON.stringify(
        json
      ),
      options
    ).finally(
      ()=>{
        this.showAutoCloseMessage('Alert sent!', 'Alert <b>'+alert.name+'</b> was sent. </br></br> Thanks! :)', 3000);
      }
    );
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
