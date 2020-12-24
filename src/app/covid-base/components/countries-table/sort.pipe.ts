import { Pipe, PipeTransform } from '@angular/core';
import { ICountries } from '../../../core/models/covid-base.models';

@Pipe({
  name: 'sortPipe'
})
export class SortPipe implements PipeTransform {

  transform(countries: ICountries[], args: any[]): ICountries[] {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    countries.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
        } else if (a[sortField] > b[sortField]) {
          return 1 * multiplier;
        } else {
          return 0;
        }
      }
    );
    return countries;
  }

}
