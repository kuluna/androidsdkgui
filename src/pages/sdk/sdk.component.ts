import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as settings from 'electron-settings';
import { Observable } from 'rxjs/Rx';

import { AppSetting } from '../../models/models';
import { InstallDialog } from '../../dialogs/dialog.component';
import { getListAsync, installPackageAsync, InstallStates, parseList, Package, sort } from '../../services/sdkmanager';

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

  constructor(private dialog: MatDialog, private router: Router) {}

  async ngOnInit() {
    this.updating = true;
    // load settings
    const values: any = settings.get('AppSetting', new AppSetting());
    if (!values.sdkRootPath) {
      this.router.navigate(['./setting']);
      return;
    }
    this.sdkSetting = values as AppSetting;

    // get package list
    const list = await getListAsync(this.sdkSetting);
    this.packages = sort(parseList(list.out));

    this.updating = false;
  }

  createDataSource(pkg: Package[]) {
    return new PackageDataSource(pkg);
  }

  async install(p: Package) {
    const installing = this.dialog.open(InstallDialog, { disableClose: true });
    await installPackageAsync(this.sdkSetting, p.rawName);
    installing.close();
    // reload
    await this.ngOnInit();
  }
}

export class PackageDataSource extends DataSource<Package> {
  constructor(private data: Package[]) {
    super();
  }

  connect(): Observable<Package[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
