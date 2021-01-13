export interface IGlobal {
  updated: number;
  country: string;
  population: number;
  cases: number;
  deaths: number;
  recovered: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
}

export interface ICountries {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  deaths: number;
  recovered: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
  population: number;
}

export interface ICountrData {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  population: number;
  valueName: string;
  value: number;
}

export interface IHistorical {
  updated: number;
  country: string;
  province: string;
  timeline: ITimeLineGlobal;
}

export interface ITimeLineGlobal {
  cases: IDayData;
  deaths: IDayData;
  recovered: IDayData;
}

export interface IHistData {
  country: string;
  valueName: string;
  value: IDayData;
}

export interface IDayData {
  [propName: string]: number;
}
