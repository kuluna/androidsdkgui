import { Injectable } from '@angular/core';
import * as Path from 'path';

import { execFileAsync } from './execpromise';

@Injectable()
export class SdkManagerService {
  async checkAsync(toolPath: string) {
    const normalize = Path.join(toolPath, 'bin', 'sdkmanager');
    const std = await execFileAsync(`${normalize}.bat`, ['--list']);

    return /done\r?\n?/.test(std.out);
  }
}
