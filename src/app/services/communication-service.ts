import {Injectable, OnInit} from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CommunicationService{
  address:string;
  private emitWindowResize = new Subject<any>();
  windowResized$ = this.emitWindowResize.asObservable();
  windowResize(change: any) {
    this.emitWindowResize.next(change);
  }
}
