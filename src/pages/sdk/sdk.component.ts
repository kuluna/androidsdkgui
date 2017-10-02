import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as settings from 'electron-settings';
import { Observable } from 'rxjs/Rx';

import { AppSetting } from '../../models/models';
import { getListAsync, installPackageAsync, InstallStates, parseList, Package } from '../../services/sdkmanager';

@Component({
  selector: 'app-sdk',
  templateUrl: './pages/sdk/sdk.html'
})
export class SdkComponent implements OnInit {
  InstallState = InstallStates;
  packages: Package[] = [];
  updating = true;
  sdkSetting: AppSetting;
  displayedColumns = ['check', 'name', 'version', 'state'];

  constructor(private dialog: MdDialog, private router: Router) {}

  async ngOnInit() {
    // load settings
    const values: any = settings.get('AppSetting', new AppSetting());
    if (!values.sdkRootPath) {
      this.router.navigate(['./setting']);
      return;
    }
    this.sdkSetting = values as AppSetting;

    // get package list
    const list = await getListAsync(this.sdkSetting);
    this.packages = parseList(list.out);

    this.updating = false;
  }

  createDataSource(pkg: Package[]) {
    return new PackageDataSource(pkg);
  }

  async install(p: Package) {
    if (p.state == InstallStates.Available) {
      const installing = this.dialog.open(InstallDialog, { disableClose: true });
      await installPackageAsync(this.sdkSetting, p.rawName);
      installing.close();
      // reload
      await this.ngOnInit();
    }
  }

  async update(p: Package) {
    if (p.state == InstallStates.Updateable) {
      const installing = this.dialog.open(InstallDialog, { disableClose: true });
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
export class InstallDialog {}

export class PackageDataSource extends DataSource<Package> {
  constructor(private data: Package[]) {
    super();
  }

  connect(): Observable<Package[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
