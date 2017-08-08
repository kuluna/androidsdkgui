import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import * as settings from 'electron-settings';

import { SdkManagerService } from '../../services/sdkmanager.service';
import { AppSetting } from '../../models/models';

@Component({
  selector: 'app-setting',
  templateUrl: './pages/setting/setting.html',
  providers: [SdkManagerService]
})
export class SettingComponent implements OnInit {
  toolPath = '';
  updating = false;

  constructor(private snackBar: MdSnackBar,
              private sdkManager: SdkManagerService) {}

  ngOnInit() {
    const values: any = settings.get('AppSetting', { toolPath: '' });
    this.toolPath = values.toolPath;
  }

  async onSubmit(value: AppSetting) {
    this.updating = true;

    // run shell 'sdkmanager --list'
    // if last stdout string 'done', it is ok
    if (await this.sdkManager.checkAsync(value.toolPath)) {
        settings.set('AppSetting', { toolPath: value.toolPath });
        this.snackBar.open('Update!', undefined, { duration: 1500 });

    } else {
      this.snackBar.open('Error!');
    }

      this.updating = false;
  }
}
