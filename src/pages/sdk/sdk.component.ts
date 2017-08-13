import { Component, OnInit } from '@angular/core';
import * as settings from 'electron-settings';

import * as sdkManager from '../../services/sdkmanager';

@Component({
  selector: 'app-sdk',
  templateUrl: './pages/sdk/sdk.html'
})
export class SdkComponent implements OnInit {
  packages: sdkManager.Package[] = [];

  async ngOnInit() {
    const values: any = settings.get('AppSetting', { toolPath: '' });
    if (!values.toolPath) {
      return;
    }

    const list = await sdkManager.getListAsync(values.toolPath);
    this.packages = sdkManager.parseList(list.out);
  }
}
