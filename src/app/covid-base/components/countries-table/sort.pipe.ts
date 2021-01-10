import { Pipe, PipeTransform } from '@angular/core';
import { ICountrData } from '../../../core/models/covid-base.models';

@Pipe({
  name: 'sortPipe',
})
export class SortPipe implements PipeTransform {
  transform(array: ICountrData[]): ICountrData[] {
    if (array !== undefined) {
      array.sort((a: ICountrData, b: ICountrData) => {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });
    }
    return array;
  }
}
