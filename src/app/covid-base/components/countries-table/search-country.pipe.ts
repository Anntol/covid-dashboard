import { Pipe, PipeTransform } from '@angular/core';
import { ICountries } from '../../../core/models/covid-base.models';

@Pipe({
  name: 'searchCountryPipe'
})
export class SearchCountryPipe implements PipeTransform {

  transform(countries: ICountries[], value: string = ''): ICountries[] {
    if (!value || !countries) {
      return countries;
    }
    const valueLowCase: string = value.toLowerCase();
    return countries.filter(( country ) =>
    {
      function isIncludes(str: string): boolean {
        return str.toLowerCase().includes(valueLowCase);
      }

      const onCheck: string[] = [
        country.country,
      ];
      return onCheck.some(isIncludes);
    });
  }

}
