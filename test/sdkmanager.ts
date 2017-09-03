import * as assert from 'assert';
import { readFileSync } from 'fs';
import * as Path from 'path';

import * as sdkManager from '../src/services/sdkmanager';
import { AppSetting } from '../src/models/models';

function getList(num: number) {
  return readFileSync(`./test/assets/sdkmanager/list${num}.txt`, 'utf-8');
}

describe('sdkmanager', () => {
  it('parse list1', () => {
    const stdout = getList(1);
    const packages = sdkManager.parseList(stdout);

    console.log(JSON.stringify(packages, null, 2));
  });

  it('parse list2', () => {
    const stdout = getList(2);
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
