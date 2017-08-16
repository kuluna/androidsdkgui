import * as Path from 'path';

import { AppSetting } from '../models/models';
import { execFileAsync, Standard } from './execpromise';

export async function getListAsync(sdkSetting: AppSetting): Promise<Standard> {
  const normalize = Path.join(sdkSetting.toolPath, 'bin', 'sdkmanager');
  const args = ['--list', '--verbose'];
  if (sdkSetting.useProxy) {
    args.push('--proxy=http');
    args.push(`--proxy_host=${sdkSetting.proxy}`);
    args.push(`--proxy_port=${sdkSetting.port}`);
  }
  return await execFileAsync(`${normalize}.bat`, args);
}

export async function checkAsync(sdkSetting: AppSetting): Promise<boolean> {
  const std = await getListAsync(sdkSetting);
  return /done\r?\n?/.test(std.out);
}

export function parseList(stdout: string) {
  const packages: Package[] = [];

  const lines = stdout.split(/\r?\n/);
  let pointer = 0;

  // skip
  for (; pointer <= lines.length; pointer += 1) {
    if (lines[pointer].startsWith('done')) {
      return packages;
    } else if (lines[pointer].startsWith('Installed packages:')) {
      pointer += 2;
      break;
    }
  }

  // installed packages
  for (; pointer <= lines.length; pointer += 5) {
    if (lines[pointer].startsWith('done')) {
      return packages;
    } else if (lines[pointer].startsWith('Available Packages:')) {
      pointer += 2;
      break;
    }

    const p = new Package();
    p.state = InstallStates.installed;
    [p.name, p.category] = parsePackageName(lines[pointer]);
    p.description = lines[pointer + 1].slice(24);
    p.version = lines[pointer + 2].slice(24);
    p.installedLocation = lines[pointer + 3].slice(24);

    packages.push(p);
  }

  // available packages
  for (; pointer <= lines.length; ) {
    if (lines[pointer].startsWith('done')) {
      return packages;
    } else if (lines[pointer].startsWith('Available Updates:')) {
      pointer += 2;
      break;
    }

    const p = new Package();
    p.state = InstallStates.available;
    [p.name, p.category] = parsePackageName(lines[pointer]);
    p.description = lines[pointer + 1].slice(24);
    p.version = lines[pointer + 2].slice(24);

    packages.push(p);

    pointer += 2;
    // skip
    do {
      pointer += 1;
    } while (lines[pointer]);
    pointer += 1;
  }

  // available updates
  for (; pointer < lines.length; ) {
    if (lines[pointer].startsWith('done')) {
      break;
    }

    const p = new Package();
    p.state = InstallStates.updateable;
    [p.name, p.category] = parsePackageName(lines[pointer]);
    p.version = lines[pointer + 2].slice(20);
    packages.push(p);

    //skip
    pointer += 2;
    do {
      pointer += 1;
    } while (lines[pointer] && lines[pointer] === 'done');
    pointer += 1;
  }

  return packages;
}

function parsePackageName(name: string): [string, string] {
  const names = name.split(';');
  return [names[1] ? names.slice(1).join('; ') : names[0], names[0]];
}

export class Package {
  category: string;
  name: string;
  details: string[] | null;
  description: string;
  version: string;
  state: InstallStates;
  installedLocation: string | null;
}

export enum InstallStates {
  installed = 'Installed',
  available = 'Available',
  updateable = 'Updateable'
}
