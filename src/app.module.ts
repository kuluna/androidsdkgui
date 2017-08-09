import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AvdComponent } from './pages/avd/avd.component';
import { SdkComponent } from './pages/sdk/sdk.component';
import { SettingComponent } from './pages/setting/setting.component';

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
    MaterialModule
  ],
  declarations: [
    AppComponent,
    AvdComponent,
    SdkComponent,
    SettingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
