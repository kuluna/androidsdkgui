import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import * as settings from 'electron-settings';

import * as sdkManager from '../../services/sdkmanager';
import { AppSetting } from '../../models/models';

@Component({
  selector: 'app-setting',
  templateUrl: './pages/setting/setting.html'
})
export class SettingComponent implements OnInit {
  toolPath = '';
  updating = false;

  constructor(private snackBar: MdSnackBar) {}

  ngOnInit() {
    const values: any = settings.get('AppSetting', { toolPath: '' });
    this.toolPath = values.toolPath;
  }

  async onSubmit(value: AppSetting) {
    this.updating = true;

    // run shell 'sdkmanager --list'
    // if last stdout string 'done', it is ok
    if (await sdkManager.checkAsync(value.toolPath)) {
        settings.set('AppSetting', { toolPath: value.toolPath });
        this.snackBar.open('Update!', undefined, { duration: 1500 });

    } else {
      this.snackBar.open('Error!');
    }

      this.updating = false;
  }
}
