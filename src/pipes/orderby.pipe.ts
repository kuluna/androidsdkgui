import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(value: Array<any>, field: string, asc: string): Array<any> {
    return value.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1 * (asc === 'asc' ? 1 : -1);
      } else if (a[field] > b[field]) {
        return 1 * (asc === 'asc' ? 1 : -1);
      } else {
        return 0;
      }
    });
  }
}
