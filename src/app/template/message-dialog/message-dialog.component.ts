import {MdDialogRef} from '@angular/material';
import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'message-dialog',
  template: `
    <div class="container-fluid">
      <div class="row-fluid">
        <div class="centering text-center">
          <p>{{ title }}</p>
          <p [innerHtml]="message"></p>
          <button #closeButton type="button" md-button
                  (click)="dialogRef.close()">Close
          </button>
        </div>
      </div>
    </div>
  `,
})
export class MessageDialogComponent {
  @ViewChild('closeButton') closeButton;
  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<MessageDialogComponent>) {
  }

  closeDialog() {
    this.closeButton._elementRef.nativeElement.click();
    this.dialogRef.close();
  }

  ngOnDestroy() {

  }
}
