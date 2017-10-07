import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-warn-license',
  template:
  `
  <h2 md-dialog-title>Accept Android SDK License!</h2>
  <md-dialog-content>
    <p>License is not accepted.</p>
    <p>Can not be installed since their licenses or those of the packages they depend on were not accepted.</p>
    <code>
      {{data.sdkManagerPath}} --licenses
    </code>
  </md-dialog-content>
  <md-dialog-actions fxLayout="row" fxLayoutAlign="end ">
    <button [md-dialog-close]="true" md-button color="accent">CLOSE</button>
  </md-dialog-actions>
  `
})
export class WarningLicenseDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-install-dialog',
  template:
  `
  <div fxLayout="column" fxLayoutAlign=" center">
    <h2>Installing...</h2>
    <md-progress-bar mode="indeterminate"></md-progress-bar>
  </div>
  `
})
export class InstallDialog {}
