import { execFile } from 'child_process';

export function execFileAsync(file: string, args?: string[]): Promise<Standard> {
  return new Promise((resolve, reject) => {
    execFile(file, args, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(new Standard(stdout, stderr));
    });
  });
}

export class Standard {
  constructor(public out: string, public err: string) {}
}
