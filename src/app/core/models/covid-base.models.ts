export interface ICovid19 {
  Message: string;
  Global: IGlobal;
  Countries: ICountries[];
  Date: string,
}

export interface IGlobal {
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number;
}

export interface ICountries {
  Country: string,
  CountryCode: string,
  Slug: string,
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: string,
  Premium: {};
}



