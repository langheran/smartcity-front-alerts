import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CommunicationService {
  mapContent:any;
  private emitWindowResize = new Subject<any>();
  windowResized$ = this.emitWindowResize.asObservable();
  windowResize(change: any) {
    this.emitWindowResize.next(change);
  }
}

