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
      new AlertType("HeartAttack", "Heart attack", "HeartAttack", true),
      new AlertType("AsthmaAttack", "Asthma attack", "AsthmaAttack", true),
      new AlertType("Traffic", "Traffic", "Traffic"),
      new AlertType("Weather", "Weather", "Weather"),
      new AlertType("Environment", "Environment", "Environment"),
      new AlertType("Pollen", "Pollen", "Pollen"),
      new AlertType("Health", "Health", "Health"),
      new AlertType("Security", "Security", "Security"),
      new AlertType("SOSAlerts", "SOS Alerts", "SOSAlerts"),
    ];
  }

  getAlertList() {
    return {
      "AsthmaAttack": this.getAlertTypes().filter(e => e.name === "AsthmaAttack"),
      "HeartAttack": this.getAlertTypes().filter(e => e.name === "HeartAttack"),
      "Traffic": [
        new Alert("TrafficJam", "Traffic jam", "TrafficJam"),
        new Alert("ModerateTrafficJam", "Moderate traffic jam", "ModerateTrafficJam"),
        new Alert("StandstillTrafficJam", "Standstill traffic jam", "StandstillTrafficJam"),
        new Alert("HeavyTrafficJam", "Heavy traffic jam", "HeavyTrafficJam"),
        new Alert("MinorAccident", "Minor accident", "MinorAccident"),
        new Alert("CarAccident", "Car accident", "CarAccident"),
        new Alert("CarInWrongDirection", "Car in wrong direction", "CarInWrongDirection"),
        new Alert("CarStopped", "Car Stopped", "CarStopped"),
        new Alert("Roadworks", "Roadworks", "Roadworks"),
        new Alert("RoadClosed", "Road closed", "RoadClosed"),
        new Alert("HazardOnRoad", "Hazard on road", "HazardOnRoad"),
        new Alert("Pothole", "Pothole", "Pothole"),
        new Alert("CongestionOnRoad", "Congestion on road", "CongestionOnRoad"),
        new Alert("InjuredBiker", "Injured Biker", "InjuredBiker"),
        new Alert("AlligatorCracking", "Alligator cracking", "AlligatorCracking"),],
      "Weather": [
        new Alert("Rainfall", "Rainfall", "Rainfall"),
        new Alert("Temperature", "Temperature", "Temperature"),
        new Alert("HighTemperature", "High temperature", "HighTemperature"),
        new Alert("LowTemperature", "Low temperature", "LowTemperature"),
        new Alert("HeatWave", "Heat wave", "HeatWave"),
        new Alert("Ice", "Ice", "Ice"),
        new Alert("RelativeHumidity", "Relative humidity", "RelativeHumidity"),
        new Alert("Wind", "Wind", "Wind"),
        new Alert("Flood", "Flood", "Flood"),
        new Alert("Fog", "Fog", "Fog"),
        new Alert("Tornado", "Tornado", "Tornado"),
        new Alert("Tsunami", "Tsunami", "Tsunami"),
        new Alert("Snow", "Snow", "Snow"),
        new Alert("Storm", "Storm", "Storm"),
        new Alert("TropicalCyclone", "Tropical cyclone", "TropicalCyclone"),
        new Alert("TropicalStorm", "Tropical storm", "TropicalStorm"),
        new Alert("Hurricane", "Hurricane", "Hurricane"),],
      "Environment": [
        new Alert("Smog", "Smog", "Smog"),
        new Alert("AirPollution", "Air pollution", "AirPollution"),
        new Alert("PreContingencyAlert", "Pre-contingency alert", "PreContingencyAlert"),
        new Alert("ContingencyAlert", "Contingency alert", "ContingencyAlert"),
        new Alert("Co", "CO", "Co"),
        new Alert("No2", "NO2", "No2"),
        new Alert("So2", "SO2", "So2"),
        new Alert("O3", "O3", "O3"),
        new Alert("Pm10", "PM10", "Pm10"),
        new Alert("VolcanoGas", "Gas produced by volcanoes", "VolcanoGas"),
        new Alert("IndustrialGas", "Gas produced by industrial processes", "IndustrialGas"),
        new Alert("VehicularGas", "Gas emitted from vehicular exhaust", "VehicularGas"),
        new Alert("AgricultureGas", "Gas emitted from agriculture, including animal husbandry and NH3-based fertilizer applications", "AgricultureGas"),
        new Alert("GarbageOdors", "Odors from garbage, sewage, and industrial processes", "GarbageOdors"),
        new Alert("Radioactive", "Radioactive pollutants produced by nuclear explosions and war explosives", "Radioactive"),],
      "Pollen": [
        new Alert("SymptomsOrDiscomforts", "Symptoms or discomforts of users", "SymptomsOrDiscomforts"),
        new Alert("PollenLevel", "Level of pollen on air", "PollenLevel"),
        new Alert("PollenConcentration", "Pollen concentration", "PollenConcentration"),
        new Alert("SinusPressure", "Sinus pressure", "SinusPressure"),
        new Alert("RunnyNose", "Runny nose", "RunnyNose"),
        new Alert("WateryEyes", "Watery eyes", "WateryEyes"),
        new Alert("Cough", "Cough", "Cough"),
        new Alert("NasalCongestion", "Nasal congestion", "NasalCongestion"),],
      "Health": [
        new Alert("AsthmaAttack", "Asthma attack", "AsthmaAttack"),
        new Alert("BumpedPatient", "Bumped patient", "BumpedPatient"),
        new Alert("FallenPatient", "Fallen patient", "FallenPatient"),
        new Alert("HeartAttack", "Heart attack", "HeartAttack"),],
      "Security": [
        new Alert("Assault", "Assault", "Assault"),
        new Alert("Robbery", "Robbery", "Robbery"),
        new Alert("SuspiciousAction", "Suspicious action", "SuspiciousAction"),],
      "SOSAlerts": [
        new Alert("Shelter", "Shelter", "Shelter"),
        new Alert("CollectionCenter", "Collection center", "CollectionCenter"),
        new Alert("Hospital", "Hospital", "Hospital"),
        new Alert("BloodBank", "Blood bank", "BloodBank"),
        new Alert("Earthquake", "Earthquake", "Earthquake"),
        new Alert("Collapse", "Collapse", "Collapse"),
        new Alert("CollapsedBuilding", "Collapsed building", "CollapsedBuilding"),
        new Alert("BuildingOnTheVergeOfCollapse", "Building on the verge of collapse", "BuildingOnTheVergeOfCollapse"),
        new Alert("Sinking", "Sinking", "Sinking"),
        new Alert("MajorCrack", "Major crack", "MajorCrack"),
        new Alert("MinorCrack", "Minor crack", "MinorCrack"),
        new Alert("LightTransformerDropped", "Light transformer dropped", "LightTransformerDropped"),
        new Alert("FallenLightPost", "Fallen light post", "FallenLightPost"),
        new Alert("Fire", "Fire", "Fire"),
        new Alert("WaterShortage", "Water shortage", "WaterShortage"),
        new Alert("WithoutLightService", "Without light service", "WithoutLightService"),
        new Alert("GasLeak", "Gas leak", "GasLeak"),]
    };
  }

  getAlertsByAlertType(alertTypeName: string): Observable<Alert[]> {
    var res: Observable<Alert[]>;
    switch (alertTypeName) {
      case "ReadFromMongo":
        res = this.http.get(document.location.protocol + '//' + document.location.hostname + ':3000' + '/api/alerts/TrafficJam').map((val, i) => <Alert[]>val.json());
        break;
      default:
        res = Observable.create(observer => {
          observer.next(this.getAlertList()[alertTypeName]);
        });
    }
    return res;
  }

  getAlertTypeByName(alertTypeName: string): AlertType {
    return this.getAlertTypes().filter(e => e.name === alertTypeName)[0];
  }

  getAlertByName(alertTypeName: string, alertName: string): AlertType {
    return this.getAlertList()[alertTypeName].filter(e => e.name === alertName)[0];
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

  searchAlertByName(alertName) {
    var alert;
    var breakAll = false;
    var myDictionary = this.getAlertList();
    for (let key in myDictionary) {
      let value = myDictionary[key];
      for (let i = 0; i < value.length; i++) {
        if (value[i].name === alertName && !value[i].sendImmediately) {
          alert = this.getAlertTypes().filter(e => e.name === key)[0];
          breakAll = true;
          break;
        }
        if (breakAll)
          break;
      }
    }
    return alert;
  }

  searchAlertInmediately(alert): AlertType {
    if (alert.sendImmediately) {
      alert=this.searchAlertByName(alert.name);
    }
    return alert;
  }

  submitAlert(alert: AlertType, eventObserved: Alert, description: string, address: any, severity: string) {
    alert = this.searchAlertInmediately(alert);
    description = description.replace(/(?:\r\n|\r|\n)/g, '\\n');
    description=description.trim();
    var date = new Date();
    var alertId = UtilityService.guid();

    var streetAddress="";
    var addressLocality="";

    if(address["formatted_address"] != undefined) {
      streetAddress=address["formatted_address"];
    }
    if(address["address_components"] != undefined) {
      if(addressLocality=="")
      {
        address["address_components"].forEach((address_component) => {
          if (address_component.types[0] == "administrative_area_level_1")
            addressLocality = address_component.short_name;
        });
      }
      if(addressLocality=="") {
        address["address_components"].forEach((address_component) => {
          if (address_component.types[0] == "locality")
            addressLocality = address_component.short_name;
        });
      }
      if(addressLocality=="")
      {
        address["address_components"].forEach((address_component) => {
          if (address_component.types[0] == "political")
            addressLocality = address_component.short_name;
        });
      }
    }

    var model = {
      "id": alertId,
      "type": "Alert",
      "category": alert.name, // alertType
      "subCategory": eventObserved.name, // eventObserved
      "address": {
        "addressLocality": addressLocality,
        "streetAddress": streetAddress,
        "geocoderAddressComponents": address["address_components"]
      },
      "locationDescription": streetAddress,
      "location": {
        "type": "Point",
        "coordinates": [this.locationService.latitude, this.locationService.longitude]
      },
      "dateTime": date.toISOString(),
      "dateObserved": date.toISOString(),
      "description": description,
      "refDevice": "30Nov",
      "alertSource": this.loginService.getLoggedUser().id, // refUser
      "dataSource": "USER",
      "severity": severity
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

    let headers2 = new Headers({
      'Content-Type': 'application/json',
      'Fiware-Service': 'default',
      'Fiware-ServicePath': '/'
    });
    let options2 = new RequestOptions({headers: headers2});

    if (environment.encrypt) {
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
                  options2
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
    }
    else {
      if (environment.infotec_write_location == "orion") {
        var _sendAlertByCategoryId=false;
        if(_sendAlertByCategoryId) {
          var model2 = JSON.parse(JSON.stringify(
            model
          ));
          delete model2.id;
          delete model2.type;
          var alertId = "Alert:" + model2.subCategory.charAt(0).toLowerCase() + model2.subCategory.slice(1);
          source = Observable.forkJoin(
            this.http.post(
              environment.backend_orion + "/v2/entities?options=keyValues",
              JSON.stringify(
                model
              ),
              options2
            ),
            this.http.post(
              environment.infotec_backend_orion + "/v2/entities/" + alertId + "/attrs?options=keyValues",
              JSON.stringify(
                model2
              ),
              options2
            )
          ).finally(
            () => {
              this.showAutoCloseMessage('Alert sent!', 'Alert <b>' + alert.display + (alert.sendImmediately ? '' : ' - ' + eventObserved.display) + '</b> was sent. </br></br> Thanks! :)', 3000);
            }
          );
        }
        else
        {
          alertId = UtilityService.guid();
          source = Observable.forkJoin(
            this.http.post(
              environment.backend_orion + "/v2/entities?options=keyValues",
              JSON.stringify(
                model
              ),
              options2
            ),
            this.http.post(
              environment.infotec_backend_orion + "/v2/entities?options=keyValues",
              JSON.stringify(
                model
              ),
              options2
            )
          ).finally(
            () => {
              this.showAutoCloseMessage('Alert sent!', 'Alert <b>' + alert.display + (alert.sendImmediately ? '' : ' - ' + eventObserved.display) + '</b> was sent. </br></br> Thanks! :)', 3000);
            }
          );
        }
      }
      else {
        source = Observable.forkJoin(
          this.http.post(
            environment.backend_orion + "/v2/entities?options=keyValues",
            JSON.stringify(
              model
            ),
            options2
          ),
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
        )
      }
    }


    return source;
  }

  getAlertsByUser(): Observable<any[]> {
    // Firefox requires Accept
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(environment.backend_orion + "/v2/entities/?options=keyValues&type=Alert&limit=10&orderBy=!dateCreated&q=alertSource==" + this.loginService.getLoggedUser().id)
      .flatMap(val => {
        return <any[]>val.json()
      }).map(re => {
        if (re.description)
          re.description = re.description.replace("\\n", "\r\n");
        if (environment.encrypt) {
          var regexexp = new RegExp("-", 'g')
          if (re.locationDescription)
            re.locationDescription = re.locationDescription.replace(regexexp, "=");
          if (re.location)
            re.location = JSON.parse(JSON.stringify(re.location).replace(regexexp, "="));
          if (re.refDevice)
            re.refDevice = re.refDevice.replace(regexexp, "=");
        }
        return re;
      }).concatMap(val => {
        if (environment.encrypt) {
          return this.getDecryptedAlert(val).onErrorResumeNext(Observable.empty());
        } else {
          return Observable.of(val);
        }
      }).map(val => {
          var res = <any>val;
          if (environment.encrypt)
            return res.model;
          else
            return res;
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
        if (environment.encrypt) {
          var regexexp = new RegExp("-", 'g')
          if (re.locationDescription)
            re.locationDescription = re.locationDescription.replace(regexexp, "=");
          if (re.location)
            re.location = JSON.parse(JSON.stringify(re.location).replace(regexexp, "="));
          if (re.refDevice)
            re.refDevice = re.refDevice.replace(regexexp, "=");
        }
        return re;
      }).concatMap(val => {
        if (environment.encrypt) {
          return this.getDecryptedAlert(val).onErrorResumeNext(Observable.empty());
        } else {
          return Observable.of(val);
        }
      }).map(val => {
          var res = <any>val;
          if (environment.encrypt)
            return res.model;
          else
            return res;
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
