import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import * as settings from 'electron-settings';

import * as sdkManager from '../../services/sdkmanager';
import { AppSetting } from '../../models/models';

@Component({
  selector: 'app-setting',
  templateUrl: './pages/setting/setting.html',
  styleUrls: ['./pages/setting/setting.css']
})
export class SettingComponent implements OnInit {
  appSetting: AppSetting = new AppSetting();
  updating = false;

  constructor(private snackBar: MdSnackBar) {}

  ngOnInit() {
    const values: any = settings.get('AppSetting', new AppSetting());
    this.appSetting.sdkRootPath = values.sdkRootPath;
    this.appSetting.useProxy = values.useProxy;
    this.appSetting.proxy = values.proxy;
    this.appSetting.port = values.port;
  }

  async onSubmit(values: AppSetting) {
    this.updating = true;

    // run shell 'sdkmanager --list'
    // if last stdout string 'done', it is ok
    if (await sdkManager.checkAsync(values)) {
      const appSetting = {
        sdkRootPath: values.sdkRootPath,
        useProxy: values.useProxy,
        proxy: values.proxy,
        port: values.port
      };
      settings.set('AppSetting', appSetting);
      this.snackBar.open('Update!', undefined, { duration: 1500 });
    } else {
      this.snackBar.open('Error!');
    }

      this.updating = false;
  }
}
