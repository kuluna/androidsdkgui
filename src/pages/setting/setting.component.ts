import { Component, OnInit } from '@angular/core';
import * as settings from 'electron-settings';

import { AppSetting } from '../../models/models';

@Component({
  selector: 'app-setting',
  templateUrl: './pages/setting/setting.html'
})
export class SettingComponent implements OnInit {
  public toolPath = '';

  ngOnInit() {
    const values: any = settings.get('AppSetting', { toolPath: '' });
    this.toolPath = values.toolPath;
    console.log(values);
  }

  onSubmit(value: AppSetting) {
    settings.set('AppSetting', { toolPath: value.toolPath });
  }
}
