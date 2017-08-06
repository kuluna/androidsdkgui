import { Component, OnInit } from '@angular/core';
import { exec } from 'child_process';

@Component({
  selector: 'app-sdk',
  templateUrl: './pages/sdk/sdk.html'
})
export class SdkComponent implements OnInit {
  ngOnInit() {
    exec('echo hello!', (error, stdout, stderr) => {
      console.log(stdout);
    });
  }
}
