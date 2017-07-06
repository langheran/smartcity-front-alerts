import {Component, OnInit, Inject, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Alert} from "../alert";
import {OrionContextBrokerService} from "app/services/orion-context-broker-service";
import {AlertType} from "../alert-type";
import {MdDialog, MdDialogRef} from "@angular/material";
import {CommunicationService} from "../services/communication-service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-alert-type-alerts-list',
  templateUrl: './alert-type-alerts-list.component.html',
  styleUrls: ['./alert-type-alerts-list.component.scss']
})
export class AlertTypeAlertsListComponent implements OnInit {
  colNumber: number;
  alertTypeName: string;
  alertType: AlertType;
  alertsList: Alert[];
  currentAlert: Alert;
  display: string;
  margentop: string;
  comment: string;
  address: string;
  //VARIABLES PARA LO ANCHO Y ALTO DE LOS BOTONES COMMENT,DONE
  BTNwidth: any;
  BTNheight: any;

  @ViewChild('sidenav') sidenav;
  @ViewChild('container') container;

  constructor(private router: Router, private route: ActivatedRoute, @Inject('OrionContextBroker') public orion: OrionContextBrokerService, public dialog: MdDialog, private _communicationService: CommunicationService) {
    this.display = "none";
    this.margentop = (window.screen.height/3)+"px";
    this.comment = "Comment";
  }

  openDialog() {
    let dialogRef = this.dialog.open(AlertThanksDialog);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }

  showArea(){
    switch (this.comment) {
      case "Cancel":
        this.comment = "Comment";
        this.display = "none";
        this.margentop = (window.screen.height/3)+"px";
        break;
     case "Comment":
      this.margentop = "0px";
      this.comment = "Cancel";
      this.display = "block";
     break;

    }
  //  this.display = "block";

    //this.comment = "Cancel";
  }

  ngOnInit() {
    if(window.screen.width>=1000){
      this.BTNwidth = ""+((window.screen.width/8)-10)+"px";
      this.BTNheight = ""+(window.screen.height/4)+"px";
    }else{
      this.BTNwidth = ""+((window.screen.width/2)-30)+"px";
      this.BTNheight = ""+((window.screen.height/4))+"px";
    }


    this.route.params.subscribe(p => {
      this.alertTypeName = p.name;
      this.address = p.address;

      this.alertType = this.orion.getAlertTypeByName(this.alertTypeName);
      this.orion.getAlertsByAlertType(this.alertTypeName).subscribe(result=>{
         this.alertsList = result;
      });
      //COMPROBAMOS SI EL PRIMER VALOR DEL ARREGLO QUE RETORNA EL SERVICIO DE
      //ORION QUE ESTA EN LA CARPETA SERVICE , ES NULL , SIGNIFICA QUE NO TIENE
      //UNA SUBCATEGORIA Y ABRIMOS EN AUTOMATICO LA BARRA PARA ESCRIBIR UN COMENTARIO
      if(this.alertsList[0]["name"] == "null"){
          this.sidenav.open();
      }else{
          this.sidenav.close();
      }

    });
  }

  ngAfterContentChecked(){
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.colNumber = window.innerWidth > window.innerHeight ? 6 : 3;
    if(this.sidenav && this.container)
      this.sidenav._elementRef.nativeElement.style.width=this.container.nativeElement.offsetWidth.toString()+'px'
  }

  onAlertSelect(event) {
    this.currentAlert = event;
    this.sidenav.open();
  }

  onAlertSubmit(description: string) {
      this.orion.submitAlert(this.alertType, this.currentAlert, description, this.address).subscribe(r=>{});
      this.router.navigate(['../']);
  }

  ngAfterViewChecked() {
    this._communicationService.windowResize(true);
  }
}

@Component({
  selector: 'dialog-result-example-dialog',
  host: {
    style: 'font-family: Roboto,"Helvetica Neue",sans-serif'
  },
  template: `
    <h2 md-dialog-title>Thank you for sharing!</h2>
    <md-dialog-content>Go to home screen?</md-dialog-content>
    <md-dialog-actions>
      <button md-button md-dialog-close>No</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button md-button [md-dialog-close]="true" [routerLink]="['']">Ok</button>
    </md-dialog-actions>
  `,
})
export class AlertThanksDialog {
  constructor(public dialogRef: MdDialogRef<AlertThanksDialog>) {
  }
}
