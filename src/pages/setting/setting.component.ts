import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import * as settings from 'electron-settings';

import * as sdkManager from '../../services/sdkmanager';
import { AppSetting } from '../../models/models';
import { WarningLicenseDialog } from '../../dialogs/dialog.component';

@Component({
  selector: 'app-setting',
  templateUrl: './pages/setting/setting.html',
  styleUrls: ['./pages/setting/setting.css']
})
export class SettingComponent implements OnInit {
  appSetting: AppSetting = new AppSetting();
  updating = false;

  constructor(public snackBar: MdSnackBar,
              public dialog: MdDialog) {}

  ngOnInit() {
    const values: any = settings.get('AppSetting', new AppSetting());
    this.appSetting.sdkRootPath = values.sdkRootPath;
    this.appSetting.useProxy = values.useProxy;
    this.appSetting.proxy = values.proxy;
    this.appSetting.port = values.port;
  }

  async onSubmit(value: AppSetting) {
    this.updating = true;

    // license exists
    if (!await sdkManager.checkLicenseAsync(value)) {
      // show warning dialog
      this.dialog.open(WarningLicenseDialog, {
        data: { sdkManagerPath: sdkManager.getSdkManagerPath(value) }
      }).afterClosed().subscribe(d => {
        this.updating = false;
      });

      return;
    }

    // run shell 'sdkmanager --list'
    // if last stdout string 'done', it is ok
    if (await sdkManager.checkDoneAsync(value)) {
      const appSetting = {
      sdkRootPath: value.sdkRootPath,
      useProxy: value.useProxy,
      proxy: value.proxy,
      port: value.port
    };
      settings.set('AppSetting', appSetting);
      this.snackBar.open('Update!', undefined, { duration: 1500 });
    } else {
      this.snackBar.open('Error!');
    }

      this.updating = false;
  }
}
