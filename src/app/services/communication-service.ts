import {Injectable, OnInit} from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CommunicationService{
  address:any;
  private emitWindowResize = new Subject<any>();
  private emitMapMarkerSet = new Subject<any>();
  windowResized$ = this.emitWindowResize.asObservable();
  windowResize(change: any) {
    this.emitWindowResize.next(change);
  }
  mapMarkerSet$ = this.emitMapMarkerSet.asObservable();
  setMapMarker(marker: any) {
    this.emitMapMarkerSet.next(marker);
  }
}
