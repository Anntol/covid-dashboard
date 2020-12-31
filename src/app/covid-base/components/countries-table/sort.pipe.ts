import { Pipe, PipeTransform } from '@angular/core';
import { ICountrData } from '../../../core/models/covid-base.models';

@Pipe({
  name: 'sortPipe',
})
export class SortPipe implements PipeTransform {
  transform(array: ICountrData[], args: string): ICountrData[] {
    if (array !== undefined) {
      array.sort((a: any, b: any) => {
        if (a[args] < b[args]) {
          return 1;
        }
        if (a[args] > b[args]) {
          return -1;
        }
        return 0;
      });
    }
    return array;
  }
}
