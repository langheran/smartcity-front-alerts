import { MdDialogModule, MdButtonModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import {DialogsService} from "./dialogs-service";
import {ConfirmDialogComponent} from "../template/confirm-dialog/confirm-dialog.component";
import {MessageDialogComponent} from "../template/message-dialog/message-dialog.component";

@NgModule({
  imports: [
    MdDialogModule,
    MdButtonModule,
  ],
  exports: [
    ConfirmDialogComponent,
    MessageDialogComponent
  ],
  declarations: [
    ConfirmDialogComponent,
    MessageDialogComponent
  ],
  providers: [
    DialogsService,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    MessageDialogComponent
  ],
})
export class DialogsModule { }
