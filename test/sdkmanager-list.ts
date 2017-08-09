import { readFileSync } from 'fs';
import * as sdkManager from '../src/services/sdkmanager';

function get() {
  return readFileSync('./test/sdkmanager-list.txt', 'utf-8');
}

describe('sdkmanager', () => {
  it('parse list', () => {
    const stdout = get();
    const packages = sdkManager.parseList(stdout);

    console.log(JSON.stringify(packages, null, 2));
  });
});
