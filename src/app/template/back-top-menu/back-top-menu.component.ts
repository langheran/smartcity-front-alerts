import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-top-menu',
  templateUrl: './back-top-menu.component.html',
  styleUrls: ['./back-top-menu.component.scss']
})
export class BackTopMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBack(){
    window.history.back();
  }
}
