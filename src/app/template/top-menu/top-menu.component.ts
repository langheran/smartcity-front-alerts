import {Component, OnInit, ViewChild} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']

})
export class TopMenuComponent implements OnInit {
  @ViewChild('toggleSidebarButton') toggleSidebarButton;
   @ViewChild('topMenu') topMenu;
  constructor() {
  }
  ngOnInit() {
    
  }

   

  toggleSidebar() {
    
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  hideMenu($event){
    if($(this.topMenu.toggleSidebarButton.nativeElement).css("display")!="none") {
      const dom: any = document.querySelector('body');
      dom.classList.remove('push-right');
      $event.stopPropagation();
    }
  }

}
