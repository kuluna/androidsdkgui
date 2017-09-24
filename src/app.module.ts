import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import * as Material from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { GroupByPipe } from './services/groupby_pipe';

import { AppComponent } from './app.component';
import { AvdComponent } from './pages/avd/avd.component';
import { InstallDialogComponent, SdkComponent } from './pages/sdk/sdk.component';
import { SettingComponent, WarningLicenseDialog } from './pages/setting/setting.component';

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
    Material.MdButtonModule,
    Material.MdCardModule,
    Material.MdCheckboxModule,
    Material.MdDialogModule,
    Material.MdFormFieldModule,
    Material.MdInputModule,
    Material.MdListModule,
    Material.MdProgressSpinnerModule,
    Material.MdSortModule,
    Material.MdTabsModule,
    Material.MdTableModule,
    Material.MdToolbarModule
  ],
  declarations: [
    AppComponent,
    AvdComponent,
    GroupByPipe,
    InstallDialogComponent,
    SdkComponent,
    SettingComponent,
    WarningLicenseDialog
  ],
  entryComponents: [
    InstallDialogComponent,
    WarningLicenseDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
