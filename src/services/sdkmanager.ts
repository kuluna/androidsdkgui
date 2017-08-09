import * as Path from 'path';

import { execFileAsync } from './execpromise';

export async function checkAsync(toolPath: string) {
  const normalize = Path.join(toolPath, 'bin', 'sdkmanager');
  const std = await execFileAsync(`${normalize}.bat`, ['--list']);

  return /done\r?\n?/.test(std.out);
}

export function parseList(stdout: string) {
  console.log(stdout);
}
