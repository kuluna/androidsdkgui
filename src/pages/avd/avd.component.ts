import { Component, OnInit } from '@angular/core';
import { exec } from 'child_process';

@Component({
  selector: 'app-avd',
  templateUrl: './pages/avd/avd.html'
})
export class AvdComponent implements OnInit {
  ngOnInit() {
    exec('echo hello!', (error, stdout, stderr) => {
      console.log(stdout);
    });
  }
}
