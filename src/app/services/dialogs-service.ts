import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import {ConfirmDialogComponent} from "../template/confirm-dialog/confirm-dialog.component";
import {MessageDialogComponent} from "../template/message-dialog/message-dialog.component";

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public timerMessage(title: string, message: string, seconds: number): Observable<boolean> {

    let dialogRef: MdDialogRef<MessageDialogComponent>;

    dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    var timeoutId = window['__zone_symbol__setTimeout'](() => {
      dialogRef.componentInstance.closeDialog();
      dialogRef=null;
      window['__zone_symbol__clearTimeout'](timeoutId);
    }, seconds);
    return dialogRef.afterClosed();
  }
}
