import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  showMenu = '';
  showSetting = '';
  showMenuManageSite = '';

  constructor() { }

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
