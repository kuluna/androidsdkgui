import { readFileSync } from 'fs';
import * as sdkManager from '../src/services/sdkmanager';

function getList(num: number) {
  return readFileSync(`./test/list${num}.txt`, 'utf-8');
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
});
