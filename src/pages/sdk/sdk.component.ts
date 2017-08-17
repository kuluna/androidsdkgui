import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as settings from 'electron-settings';

import { AppSetting } from '../../models/models';
import { getListAsync, installPackageAsync, InstallStates, parseList, Package } from '../../services/sdkmanager';

@Component({
  selector: 'app-sdk',
  templateUrl: './pages/sdk/sdk.html'
})
export class SdkComponent implements OnInit {
  packages: Package[] = [];
  updating = true;
  sdkSetting: AppSetting;

  constructor(private dialog: MdDialog,
              private router: Router) {}

  async ngOnInit() {
    const values: any = settings.get('AppSetting', new AppSetting());
    if (!values.toolPath) {
      this.router.navigate(['./setting']);
      return;
    }
    this.sdkSetting = values as AppSetting;

    const list = await getListAsync(this.sdkSetting);
    this.packages = parseList(list.out);

    this.updating = false;
  }

  async install(p: Package) {
    if (p.state == InstallStates.available) {
      const installing = this.dialog.open(InstallDialogComponent, { disableClose: true });
      await installPackageAsync(this.sdkSetting, p.rawName);
      installing.close();
      // reload
      await this.ngOnInit();
    }
  }
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
export class InstallDialogComponent {}
