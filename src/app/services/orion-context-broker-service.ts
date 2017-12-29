import {Injectable, OnInit, Inject} from '@angular/core';
import {AlertType} from "../alert-type";
import {Alert} from "../alert";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {UtilityService} from "../utility-service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import {LocationService} from "./location-service";
import {isUndefined, log} from "util";
import {DOCUMENT} from '@angular/platform-browser';
import {DialogsService} from "app/services/dialogs-service";
import {forEach} from "@angular/router/src/utils/collection";
import {LoginService} from "../core/services/login/login.service";
import {environment} from '../../environments/environment';


@Injectable()
export class OrionContextBrokerService {
  baseHref: string;

  constructor(public http: Http, private locationService: LocationService, @Inject(DOCUMENT) private document, private dialogsService: DialogsService, private loginService: LoginService) {

  }

  getAlertTypes(): AlertType[] {
    return [
      new AlertType("AsthmaAttacks", "Asthma attack", "AsthmaAttacks", true),
      new AlertType("TrafficJam", "Traffic jam", "TrafficJam"),
      new AlertType("Accidents", "Accidents", "Accident"),
      new AlertType("WeatherConditions", "Wheater condition", "WeatherCondition"),
      new AlertType("Pollutions", "High level of pollution", "HighLevelOfPollution"),
      new AlertType("Pollen", "Pollen", "Pollen"),
    ];
  }

  getAlertsByAlertType(alertTypeName: string): Observable<Alert[]> {
    var res: Observable<Alert[]>;
    switch (alertTypeName) {
      case "TrafficJam1":
        res = this.http.get(document.location.protocol + '//' + document.location.hostname + ':3000' + '/api/alerts/TrafficJam').map((val, i) => <Alert[]>val.json());
        break;
      default:
        res = Observable.create(observer => {
          switch (alertTypeName) {
            case "TrafficJam":
              var arr = [
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
            case "Accidents":
              var arr = [
                new Alert("MinorAccident", "Minor Accident", "MinorAccident"),
                new Alert("CarAccident", "Car Accident", "CarAccident"),
                new Alert("Hazard On Road", "Hazard On Road", "HazardOnRoad"),
                new Alert("Assaults", "Assaults", "Assaults"),
                new Alert("Bikers injured", "Bikers injured", "BikersInjured"),
                new Alert("CarCrashes", "Car crashes", "CarCrashes"),
                new Alert("Personanimalrunover", "Person/animal run over", "MinorAccident")
              ];
              observer.next(arr);
              break;
            case "WeatherConditions":
              var arr = [
                new Alert("Rainfall", "Rain Fall", "Rain"),
                new Alert("TropicalDeression", "Tropical Depresion", "TropicalDepression"),
                new Alert("TropicalStorm", "Tropical Storm", "TropicalStorm"),
                new Alert("Tornado", "Tornado", "Tornado"),
                new Alert("Hurricane", "Hurricane", "Hurricane"),
                new Alert("Foggy", "Foggy", "Foggy"),
                new Alert("HighTemperature", "High temperature", "HighTemperature"),
                new Alert("LowTemperature", "Low temperature", "LowTemperature"),
              ];
              observer.next(arr);
              break;
            case "Pollutions":
              var arr = [
                new Alert("Smog", "Visible smog", "VisibleSmog"),
                new Alert("volcanoes/industrial processes", "volcanoes/industrial processes", "Volcan"),
                new Alert("Aerosols, ash, dust, and fecal matter", "Aerosols, ash, dust, and fecal matter", "GasVehicular"),
                new Alert("Odors", "Odors", "OdorsGarbaage"),
                new Alert("Radioactive", "Radioactive", "RadioactiveNuclear")
              ];
              observer.next(arr);
              break;
            case "Pollen":
              var arr = [
                new Alert("Symptoms", "Symptoms or discomforts of users", "Symptoms"),
                new Alert("Sinuspressure", "Sinus pressure", "Sinuspressure"),
                new Alert("Runnynose", "Runny nose", "Runnynose"),
                new Alert("Wateryeyes", "Watery eyes", "Watereyes"),
                new Alert("Cough", "Cough", "Cough"),
                new Alert("Nasalcongestion", "Nasal congestion", "Nasalcongestion")
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
      case "Accidents":
        return new AlertType("Accidents", "Accidents", "directions_car");
      case "WeatherConditions":
        return new AlertType("WeatherConditions", "Weather condition", "wb_sunny");
      case "Pollutions":
        return new AlertType("Pollutions", "High level of pollution", "smoking_rooms");
      case "Pollen":
        return new AlertType("Pollen", "Pollen", "local_florist");
      case "AsthmaAttacks":
        return new AlertType("AsthmaAttacks", "Asthma attack", "local_pharmacy", true);
    }
  }

  getAlertEventObservedDisplay(alertTypeName: string, eventObserved: string): Observable<string> {
    return this.getAlertsByAlertType(alertTypeName).map((alerts) => {
        var display: string;
        alerts.forEach((alert) => {
          if (alert.name == eventObserved)
            display = alert.display;
        });
        return display;
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

  submitAlert(alert: AlertType, eventObserved: Alert, description: string, address: string) {
    description = description.replace(/(?:\r\n|\r|\n)/g, '\\n');
    var date = new Date();
    var alertId = UtilityService.guid();
    var model = {
      "id": alertId,
      "type": "Alert",
      "alertType": alert.name,
      "eventObserved": eventObserved.name,
      "locationDescription": address,
      "location": {
        "type": "Point",
        "coordinates": [this.locationService.latitude, this.locationService.longitude]
      },
      "dateTime": date.toISOString(),
      "description": description,
      "refDevice": "30Nov",
      "refUser": this.loginService.getLoggedUser().id,
      "dataSource": "USER"
    };
    var json = {
      "data": [
        model
      ],
      "subscriptionId": "57458eb60962ef754e7c0998"
    }
    var userId = this.loginService.getLoggedUser().id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    var source =
      this.submitEncryptedAlert(model)
        .map(res => res.json())
        .mergeMap(
          (response) => {
            var messagesJson = {
              "user": userId,
              "message": alertId,
              "key": response.Key
            };
            response.model = JSON.parse(JSON.stringify(response.model).replace(/=/g, "-"));
            return Observable.forkJoin(
              this.http.post(
                environment.backend_orion + "/v2/entities?options=keyValues",
                JSON.stringify(
                  response.model
                ),
                options
              )
              ,
              this.http.post(
                environment.backend_api + '/api/messages',
                JSON.stringify(
                  messagesJson
                ),
                options
              )
              ,
              this.http.post(
                environment.backend_sdk + "/alerts",
                JSON.stringify(
                  json
                ),
                options
              )
            ).finally(
              () => {
                this.showAutoCloseMessage('Alert sent!', 'Alert <b>' + alert.display + (alert.sendImmediately ? '' : ' - ' + eventObserved.display) + '</b> was sent. </br></br> Thanks! :)', 3000);
              }
            );
          }
        );

    return source;
  }

  getAlertsByUser(): Observable<any[]> {
    // Firefox requires Accept
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(environment.backend_orion + "/v2/entities/?options=keyValues&type=Alert&limit=10&orderBy=!dateCreated&q=refUser==" + this.loginService.getLoggedUser().id)
      .flatMap(val => {
        return <any[]>val.json()
      }).map(re => {
        if (re.description)
          re.description = re.description.replace("\\n", "\r\n");

        var regexexp = new RegExp("-", 'g')
        if (re.locationDescription)
          re.locationDescription = re.locationDescription.replace(regexexp, "=");
        if (re.location)
          re.location = JSON.parse(JSON.stringify(re.location).replace(regexexp, "="));
        if (re.refDevice)
          re.refDevice = re.refDevice.replace(regexexp, "=");
        return re;
      }).concatMap(val => {
        return this.getDecryptedAlert(val).onErrorResumeNext(Observable.empty());
      }).map(val => {
          var res = <any>val;
          return res.model;
        }
      ).scan((a, c) => {
        return a.concat(c);
        }, []);
  }

  getAlertsById(id: string): Observable<Alert> {
    // Firefox requires Accept
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(environment.backend_orion + "/v2/entities/?options=keyValues&type=Alert&limit=1&orderBy=!dateCreated&id=" + id).map(res => res.json())
      .flatMap(val => {
        return <any[]>val;
      }).map(re => {
        if (re.description)
          re.description = re.description.replace("\\n", "\r\n");

        var regexexp = new RegExp("-", 'g')
        if (re.locationDescription)
          re.locationDescription = re.locationDescription.replace(regexexp, "=");
        if (re.location)
          re.location = JSON.parse(JSON.stringify(re.location).replace(regexexp, "="));
        if (re.refDevice)
          re.refDevice = re.refDevice.replace(regexexp, "=");
        return re;
      }).concatMap(val => {
        return this.getDecryptedAlert(val).onErrorResumeNext(Observable.empty());
      }).map(val => {
          var res = <any>val;
          return res.model;
        }
      ).scan((a, c) => {
        return a.concat(c);
      }, []);
  }

  // Enryption Layer

  submitEncryptedAlert(model) {
    // Init
    var encryptionMethod = "base64";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    // Enryption request
    var json = {
      "model": model,
      "attributes": {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "0",
        "5": "1",
        "6": "1",
        "7": "0",
        "8": "0",
        "9": "1"
      },
      "method": encryptionMethod
    };
    return this.http.post(
      environment.backend_encryption + "/api/encrypt",
      JSON.stringify(
        json
      ),
      options
    );
  }

  getMessageKey(user, msgId) {
    return this.http.get(environment.backend_api + "/api/messages/" + msgId, {params: {user: user}});
  }

  getDecryptedAlert(model) {
    // Init
    var userId = this.loginService.getLoggedUser().id;
    var encryptionMethod = "base64";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    // Decryption request
    return this.getMessageKey(userId, model.id).map(res => {
      return res.json();
    })
      .mergeMap(
        (response) => {
          var json = {
            "model": model,
            "attributes": {
              "1": "0",
              "2": "0",
              "3": "0",
              "4": "0",
              "5": "0",
              "6": "0",
              "7": "0",
              "8": "1",
              "9": "1",
              "10": "1",
              "11": "0"
            },
            "method": encryptionMethod,
            "Key": response[0].key
          };
          return this.http.post(
            environment.backend_encryption + "/api/decrypt",
            JSON.stringify(
              json
            ),
            options
          ).map(res => res.json());
        });
  }
}
