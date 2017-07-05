import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'message-dialog',
  template: `
    <p>{{ title }}</p>
    <p>{{ message }}</p>
    <button type="button" md-button
            (click)="dialogRef.close()">Close</button>
  `,
})
export class MessageDialogComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<MessageDialogComponent >) {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnDestroy(){
    // alert('');
  }
}
