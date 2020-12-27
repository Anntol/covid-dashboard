import { Pipe, PipeTransform } from '@angular/core';
import { ICountries } from '../../../core/models/covid-base.models';

@Pipe({
  name: 'sortPipe'
})
export class SortPipe implements PipeTransform {

  transform(array: ICountries[], args: string): ICountries[] {
    if (array !== undefined) {
      array.sort((a: any, b: any) => {
          if ( a[args] < b[args] ){
              return 1;
          } else if ( a[args] > b[args] ) {
              return -1;
          } else {
              return 0;
          }
      });
    }
    return array;
  }
}
