import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import * as settings from 'electron-settings';
import { execFile } from 'child_process';
import * as Path from 'path';

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

  onSubmit(value: AppSetting) {
    this.updating = true;

    const normalize = Path.join(value.toolPath, 'bin', 'sdkmanager');
    // run shell 'sdkmanager --list'
    execFile(`${normalize}.bat`, ['--list'], (error, stdout, stderr) => {
      // if last stdout string 'done', it is ok
      if (/done\r?\n/.test(stdout)) {
        settings.set('AppSetting', { toolPath: value.toolPath });
        this.snackBar.open('Update!', undefined, { duration: 1500 });

      } else {
        this.snackBar.open('Error!');
      }

      this.updating = false;
    });
  }
}
