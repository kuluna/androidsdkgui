import * as assert from 'assert';
import { readFileSync } from 'fs';
import * as Path from 'path';

import * as sdkManager from '../src/services/sdkmanager';
import { AppSetting } from '../src/models/models';

describe('sdkmanager', () => {
  it('parse --list v26.0.1', () => {
    const stdout = readFileSync(`./test/assets/sdkmanager/list_v26.0.1.txt`, 'utf-8');
    const packages = sdkManager.parseList(stdout);

    console.log(JSON.stringify(packages, null, 2));
  });

  it('parse --list v26.1.1', () => {
    const stdout = readFileSync(`./test/assets/sdkmanager/list_v26.1.1.txt`, 'utf-8');
    const packages = sdkManager.parseList(stdout);

    console.log(JSON.stringify(packages, null, 2));
  });

  it('not found license', async () => {
    const sdkSetting = new AppSetting();
    sdkSetting.sdkRootPath = __dirname;
    assert.equal(await sdkManager.checkLicenseAsync(sdkSetting), false);
  });

  it('found license', async () => {
    const sdkSetting = new AppSetting();
    sdkSetting.sdkRootPath = Path.join(__dirname, 'assets');
    assert.equal(await sdkManager.checkLicenseAsync(sdkSetting), true);
  });
});
