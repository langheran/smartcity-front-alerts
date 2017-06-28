import {Injectable, OnInit} from '@angular/core';
import {AlertType} from "../alert-type";
import {Alert} from "../alert";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {UtilityService} from "../utility-service";
import {Observable} from "rxjs/Observable";
import {LocationService} from "./location-service";
import {log} from "util";

@Injectable()
export class OrionContextBrokerService {

  constructor(public http: Http, private locationService: LocationService) {

  }

  getAlertTypes(): AlertType[] {
    return [
      new AlertType("TrafficJam", "Traffic jam", "traffic"),
      new AlertType("CarAccident", "Car accident", "directions_car"),
      new AlertType("WeatherCondition", "Wheater condition", "wb_sunny"),
      new AlertType("Pollution", "High level of pollution", "smoking_rooms"),
      new AlertType("Pollen", "Pollen", "local_florist"),
      new AlertType("Asthma", "Asthma attacks", "local_pharmacy"),
    ];
  }

  getAlertsByAlertType(alertTypeName: string): Alert[] {
    switch (alertTypeName) {
      case "TrafficJam":
        return [
          new Alert("StandstillTrafficJam", "Standstill Traffic Jam", ""),
          new Alert("HeavyTrafficJam", "Heavy Traffic Jam", ""),
          new Alert("BumperToBumperTraffic", "Bumper to bumper traffic", ""),
          new Alert("ModerateTrafficJam", "Moderate Traffic Jam", ""),
          new Alert("CarStoppedOnRoad", "Car Stopped On Road", ""),
          new Alert("Roadworks", "Roadworks", ""),
          new Alert("RoadClosed", "Road closed", ""),
          new Alert("Pothole", "Pothole", ""),
        ];
      case "CarAccident":
        return [
          new Alert("MinorAccident", "Minor Accident", ""),
          new Alert("CarAccident", "Car Accident", ""),
          new Alert("Hazard On Road", "Hazard On Road", ""),
          new Alert("Assaults", "Assaults", ""),
          new Alert("Bikers injured", "Bikers injured", ""),
          new Alert("CarCrashes", "Car crashes", ""),
        ];
      case "WeatherCondition":
        return [
          new Alert("Rain", "Rain", ""),
          new Alert("Sunny", "Sunny", ""),
          new Alert("Cloud", "Cloud", ""),
          new Alert("Foggy", "Foggy", ""),
          new Alert("HighTemperature", "High temperature", ""),
          new Alert("LowTemperature", "Low temperature", ""),
        ];
      case "Pollution":
        return [
          new Alert("VisibleSmog", "Visible smog", ""),
        ];
      case "Pollen":
        return [
          new Alert("Symptoms", "Symptoms or discomforts of users", ""),
        ];
      case "Asthma":
        return [
          new Alert("AsthmaAttack", "Asthma attack", ""),
        ];
    }

  }

  getAlertTypeByName(alertTypeName: string): AlertType {
    switch (alertTypeName) {
      case "TrafficJam":
        return new AlertType("TrafficJam", "Traffic jam", "traffic");
      case "CarAccident":
        return new AlertType("CarAccident", "Car accident", "directions_car");
      case "WeatherCondition":
        return new AlertType("WeatherCondition", "Wheater condition", "wb_sunny");
      case "Pollution":
        return new AlertType("Pollution", "High level of pollution", "smoking_rooms");
      case "Pollen":
        return new AlertType("Pollen", "Pollen", "local_florist");
      case "Asthma":
        return new AlertType("Asthma", "Asthma attacks", "local_pharmacy");
    }
  }

  submitAlert(alert: AlertType, eventObserved: Alert, description: string, address: string) {
    var date = new Date();
    var json = {
      "id": UtilityService.guid(),
      "type": "Alert",
      "alertType": {"type":"String", "value":alert.name},
      "eventObserved": {"type":"String", "value":eventObserved.name},
      "address":{
        "type":"String",
        "value":address
      },
      "location": {
        "type" : "FIWARE::Location::NGSIv2",
        "value": {
          "georel": ["near", "minDistance:13500"],
          "geometry": "point",
          "coords": [[this.locationService.latitude, this.locationService.longitude]]
        }
      },
      "dateTime": {"type":"DateTime", "value":date.toISOString()},
      "description": {"type":"String","value":description},
      "refUser": {"type":"String", "value":"https://account.lab.fiware.org/users/8"},
      "refDevice": {"type":"String","value":""}
    }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    this.http.post(
      "https://207.249.127.228:1027/v2/entities",
      JSON.stringify(
        json
      ),
      options
    )
      .subscribe(r=>{});
      // .map(
      //   (res: Response) =>
      //     res.json()
      // )
      // .catch
      // (
      //   (error: any) =>
      //     Observable.throw(error.json().error || "Server error")
      // );
  }

  getAlertsByUser():Observable<Alert[]>
  {
    return this.http.get("https://207.249.127.228:1026/v2/entities/?type=Alert&limit=100&orderBy=!dateCreated").map((val, i) => <Alert[]>val.json());
  }
}

