export interface ICovid19 {
  Global: IGlobal,
  Countries: ICountries[],
  Historical: IHistorical,
}

export interface IGlobal {
  updated: number,
  country: string,
  population: number,
  cases: number,
  deaths: number,
  recovered: number;
  todayCases: number,
  todayDeaths: number,
  todayRecovered: number;
}

export interface ICountries {
  updated: number,
  country: string,
  countryInfo: {
    _id: number,
    iso2: string,
    iso3: string,
    lat: number,
    long: number,
    flag: string
  },
  totalCases: number,
  totalDeaths: number,
  totalRecovered: number,
  population: number,
}

export interface IHistorical {
  cases: IDayData;
  deaths: IDayData;
  recovered: IDayData;
}

export interface IDayData {
  [propName: string]: number;
}


