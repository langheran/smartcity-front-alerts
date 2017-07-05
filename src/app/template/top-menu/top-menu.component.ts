import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']

})
export class TopMenuComponent implements OnInit {
  @ViewChild('toggleSidebarButton') toggleSidebarButton;

  constructor() {
  }
  ngOnInit() {
  }
  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }
}
