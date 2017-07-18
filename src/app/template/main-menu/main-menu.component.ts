import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../core/services/login/login.service";
import {constants} from "../../core/common/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  isActive=true;
  showMenu = '';
  showSetting = '';
  showMenuManageSite = '';
  newAlertsCount=3;
  username:string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username=loginService.getLoggedUser().username;
  }

  logout() {
    this.loginService.logout().subscribe(
      (res) => {
        location.reload();
      }
    );
  }

  ngOnInit() {
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addExpandSubClass(element: any) {
    if (element === this.showSetting) {
      this.showSetting = '0';
    } else {
      this.showSetting = element;
    }
  }

  addExpandshowMenuManageSite(element: any) {
    if (element === this.showMenuManageSite) {
      this.showMenuManageSite = '0';
    } else {
      this.showMenuManageSite = element;
    }
  }
}

