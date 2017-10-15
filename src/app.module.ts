import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import * as Material from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { GroupByPipe } from './pipes/groupby.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';

import { AppComponent } from './app.component';
import { AvdComponent } from './pages/avd/avd.component';
import { SdkComponent } from './pages/sdk/sdk.component';
import { SettingComponent } from './pages/setting/setting.component';

import { InstallDialog, WarningLicenseDialog } from './dialogs/dialog.component';

// ----------------------------------
// App routing
const routes: Routes = [
  { path: '', redirectTo: 'sdk', pathMatch: 'full' },
  { path: 'avd', component: AvdComponent },
  { path: 'sdk', component: SdkComponent },
  { path: 'setting', component: SettingComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// ----------------------------------
// Link modules and components
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
    Material.MatButtonModule,
    Material.MatCardModule,
    Material.MatCheckboxModule,
    Material.MatDialogModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatListModule,
    Material.MatProgressBarModule,
    Material.MatProgressSpinnerModule,
    Material.MatSnackBarModule,
    Material.MatSortModule,
    Material.MatTabsModule,
    Material.MatTableModule,
    Material.MatToolbarModule
  ],
  declarations: [
    AppComponent,
    AvdComponent,
    GroupByPipe,
    OrderByPipe,
    InstallDialog,
    SdkComponent,
    SettingComponent,
    WarningLicenseDialog
  ],
  entryComponents: [
    InstallDialog,
    WarningLicenseDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
