import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-warn-license',
  template:
  `
  <h2 mat-dialog-title>Accept Android SDK License!</h2>
  <mat-dialog-content>
    <p>License is not accepted.</p>
    <p>Can not be installed since their licenses or those of the packages they depend on were not accepted.</p>
    <code>
      {{data.sdkManagerPath}} --licenses
    </code>
  </mat-dialog-content>
  <mat-dialog-actions fxLayout="row" fxLayoutAlign="end ">
    <button [mat-dialog-close]="true" mat-button color="accent">CLOSE</button>
  </mat-dialog-actions>
  `
})
export class WarningLicenseDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-install-dialog',
  template:
  `
  <div fxLayout="column" fxLayoutAlign=" center">
    <h2>Installing...</h2>
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  </div>
  `
})
export class InstallDialog {}
