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
      new AlertType("AsthmaAttacks", "Asthma attack", "AsthmaAttacks", true),
      new AlertType("TrafficJam", "Traffic", "TrafficJam"),
      new AlertType("WeatherConditions", "Weather", "WeatherCondition"),
      new AlertType("Environment", "Environment", "VehicularGas"),
      new AlertType("Pollen", "Pollen", "Pollen"),
      new AlertType("Health", "Health", "Health"),
      new AlertType("Security", "Security", "Assaults"),
      new AlertType("SOSAlerts", "SOSAlerts", "BikersInjured"),
    ];
  }

  getAlertList(){
    return {
      "AsthmaAttacks": this.getAlertTypes().filter(e => e.name === "AsthmaAttacks"),
      "HeartAttack": this.getAlertTypes().filter(e => e.name === "HeartAttack"),
      "TrafficJam": [
        new Alert("TrafficJam", "Traffic jam", "TrafficJam"),
        new Alert("ModerateTrafficJam", "Moderate Traffic Jam", "ModerateTrafficJam"),
        new Alert("StandstillTrafficJam", "Standstill Traffic Jam", "StandstillTrafficJam"),
        new Alert("HeavyTrafficJam", "Heavy Traffic Jam", "HeavyTrafficJam"),
        new Alert("MinorAccident", "Minor Accident", "MinorAccident"),
        new Alert("CarAccident", "Car Accident", "CarAccident"),
        new Alert("CarInWrongDirection", "Car in wrong direction", "CarAccident"),
        new Alert("CarStopped", "Car Stopped On Road", "CarStoppedOnRoad"),
        new Alert("Roadworks", "Roadworks", "Roadworks"),
        new Alert("RoadClosed", "Road closed", "RoadClosed"),
        new Alert("Hazard On Road", "Hazard On Road", "HazardOnRoad"),
        new Alert("Pothole", "Pothole", "Pothole"),
        new Alert("CongestionOnRoad", "Congestion on road", "BumperToBumperTraffic"),
        new Alert("BikersInjured", "Bikers injured", "BikersInjured"),
        new Alert("AlligatorCracking", "Alligator cracking", "HazardOnRoad"),
      ],
      "WeatherConditions": [
        new Alert("Rainfall", "Rain Fall", "Rain"),
        new Alert("Temperature", "Temperature", "HighTemperature"),
        new Alert("HighTemperature", "High temperature", "HighTemperature"),
        new Alert("LowTemperature", "Low temperature", "LowTemperature"),
        new Alert("HeatWave", "Heat wave", "Foggy"),
        new Alert("Ice", "Ice", "Ice"),
        new Alert("RelativeHumidity", "Relative humidity", "RelativeHumidity"),
        new Alert("Wind", "Wind", "Wind"),
        new Alert("Flood", "Flood", "Flood"),
        new Alert("Fog", "Fog", "Foggy"),
        new Alert("Tornado", "Tornado", "Tornado"),
        new Alert("Tsunami", "Tsunami", "Tsunami"),
        new Alert("Snow", "Snow", "Snow"),
        new Alert("Storm", "Storm", "TropicalStorm"),
        new Alert("TropicalCyclone", "Tropical cyclone", "Hurricane"),
        new Alert("TropicalStorm", "Tropical Storm", "TropicalStorm"),
        new Alert("Hurricane", "Hurricane", "TropicalDepression")
      ],
      "Environment": [
        new Alert("Smog", "Visible smog", "VisibleSmog"),
        new Alert("AirPollution", "Air pollution", "VehicularGas"),
        new Alert("PreContingencyAlert", "Pre-contingency alert", "Cough"),
        new Alert("ContingencyAlert", "Contingency alert", "Cough"),
        new Alert("CO", "CO", "Cough"),
        new Alert("NO2", "NO2", "Cough"),
        new Alert("SO2", "SO2", "Cough"),
        new Alert("O3", "O3", "Cough"),
        new Alert("PM10", "PM10", "Cough"),
        new Alert("VolcanoGas", "Gas produced by volcanoes", "Volcan"),
        new Alert("IndustrialGas", "Gas produced by industrial processes", "AgricultureGas"),
        new Alert("VehicularGas", "Gas emitted from vehicular exhaust", "VehicularGas"),
        new Alert("AgricultureGas", "Gas emitted from agriculture, including animal husbandry and NH3-based fertilizer applications", "AgricultureGas"),
        new Alert("Odors", "Odors from garbage, sewage, and industrial processes", "OdorsGarbaage"),
        new Alert("Radioactive", "Radioactive pollutants produced by nuclear explosions and war explosives", "RadioactiveNuclear")
      ],
      "Pollen": [
        new Alert("Symptoms", "Symptoms or discomforts of users", "Symptoms"),
        new Alert("PollenLevel", "Level of pollen on air", "Runnynose"),
        new Alert("PollenConcentration", "Pollen concentration", "Runnynose"),
        new Alert("Sinuspressure", "Sinus pressure", "Sinuspressure"),
        new Alert("Runnynose", "Runny nose", "Runnynose"),
        new Alert("Wateryeyes", "Watery eyes", "Watereyes"),
        new Alert("Cough", "Cough", "Cough"),
        new Alert("Nasalcongestion", "Nasal congestion", "Nasalcongestion")
      ],
      "Health": [
        new Alert("AsthmaAttacks", "Asthma attack", "AsthmaAttacks"),
        new Alert("BumpedPatient", "Bumped patient", "AsthmaAttacks"),
        new Alert("FallenPatient", "Fallen patient", "AsthmaAttacks"),
        new Alert("HeartAttack", "Heart attack", "HeartAttack")
      ],
      "Security": [
        new Alert("Assaults", "Assaults", "Assaults"),
        new Alert("Robbery", "Robbery", "Assaults"),
        new Alert("SuspiciousAction", "Suspicious action", "Assaults")
      ],
      "SOSAlerts": [
        new Alert("Shelter", "Shelter", "Assaults"),
        new Alert("CollectionCenter", "Collection center", "Assaults"),
        new Alert("Hospital", "Hospital", "Assaults"),
        new Alert("BloodBank", "Blood bank", "Assaults"),
        new Alert("Earthquake", "Earthquake", "Assaults"),
        new Alert("Collapse", "Collapse", "Assaults"),
        new Alert("CollapsedBuilding", "Collapsed building", "Assaults"),
        new Alert("BuildingOnTheVergeOfCollapse", "Building on the verge of collapse", "Assaults"),
        new Alert("Sinking", "Sinking", "Assaults"),
        new Alert("MajorCrack", "Major crack", "Assaults"),
        new Alert("MinorCrack", "Minor crack", "Assaults"),
        new Alert("LightTransformerDropped", "Light transformer dropped", "Assaults"),
        new Alert("FallenLightPost", "Fallen light post", "Assaults"),
        new Alert("Fire", "Fire", "Assaults"),
        new Alert("WaterShortage", "Water shortage", "Assaults"),
        new Alert("WithoutLightService", "Without light service", "Assaults"),
        new Alert("GasLeak", "Gas leak", "Assaults")
      ]
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
    return this.getAlertTypes().filter(e => e.name===alertTypeName)[0];
  }

  getAlertByName(alertTypeName: string, alertName: string): AlertType {
    return this.getAlertList()[alertTypeName].filter(e => e.name===alertName)[0];
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

  searchAlertByName(alertName){
    var alert;
    var breakAll=false;
    var myDictionary=this.getAlertList();
    for (let key in myDictionary) {
      let value = myDictionary[key];
      for(let i=0; i<value.length; i++){
        if (value[i].name === alertName && !value[i].sendImmediately) {
          alert = this.getAlertTypes().filter(e => e.name === key)[0];
          breakAll=true;
          break;
        }
        if(breakAll)
          break;
      }
    }
    return alert;
  }

  searchAlertInmediately(alert): AlertType{
    if(alert.sendImmediately)
    {
      this.searchAlertByName(alert.name);
    }
    return alert;
  }

  submitAlert(alert: AlertType, eventObserved: Alert, description: string, address: string, severity: string) {
    alert=this.searchAlertInmediately(alert);
    description = description.replace(/(?:\r\n|\r|\n)/g, '\\n');
    var date = new Date();
    var alertId = UtilityService.guid();
    var model = {
      "id": alertId,
      "type": "Alert",
      "category": alert.name, // alertType
      "subCategory": eventObserved.name, // eventObserved
      "locationDescription": address,
      "location": {
        "type": "Point",
        "coordinates": [this.locationService.latitude, this.locationService.longitude]
      },
      "dateTime": date.toISOString(),
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
      if(environment.infotec_write_location=="orion"){
        var model2=JSON.parse(JSON.stringify(
          model
        ));
        delete model2.id;
        delete model2.type;
        var alertId ="Alert:" + model2.subCategory.charAt(0).toLowerCase() + model2.subCategory.slice(1);
        source = Observable.forkJoin(
          this.http.post(
            environment.backend_orion + "/v2/entities?options=keyValues",
            JSON.stringify(
              model
            ),
            options2
          ),
          this.http.post(
            environment.infotec_backend_orion + "/v2/entities/"+alertId+"/attrs?options=keyValues",
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
        if(environment.encrypt) {
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
        if(environment.encrypt) {
          return this.getDecryptedAlert(val).onErrorResumeNext(Observable.empty());
        }else{
          return Observable.of(val);
        }
      }).map(val => {
          var res = <any>val;
          if(environment.encrypt)
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
        if(environment.encrypt) {
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
        if(environment.encrypt) {
          return this.getDecryptedAlert(val).onErrorResumeNext(Observable.empty());
        }else
        {
          return Observable.of(val);
        }
      }).map(val => {
          var res = <any>val;
          if(environment.encrypt)
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
