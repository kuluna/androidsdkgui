import { Component, OnInit } from '@angular/core';
import * as settings from 'electron-settings';

import { getListAsync, parseList, Package } from '../../services/sdkmanager';

@Component({
  selector: 'app-sdk',
  templateUrl: './pages/sdk/sdk.html'
})
export class SdkComponent implements OnInit {
  packages: Package[] = [];
  updating = true;

  async ngOnInit() {
    const values: any = settings.get('AppSetting', { toolPath: '' });
    if (!values.toolPath) {
      return;
    }

    const list = await getListAsync(values.toolPath);
    this.packages = parseList(list.out);

    this.updating = false;
  }
}
