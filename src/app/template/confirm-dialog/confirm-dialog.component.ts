import { MdDialogRef } from '@angular/material';
import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  template: `
    <p>{{ title }}</p>
    <p>{{ message }}</p>
    <button #confirmButton type="button" md-raised-button
            (click)="dialogRef.close(true)">OK</button>
    <button type="button" md-button
            (click)="dialogRef.close()">Cancel</button>
  `,
})
export class ConfirmDialogComponent {
  @ViewChild('confirmButton') confirmButton;
  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {

  }

  confirmDialog() {
    this.confirmButton._elementRef.nativeElement.click();
  }
}
