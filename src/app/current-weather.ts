export class CurrentWeather {
  constructor(public cityName:string,
              public lat: string,
              public lon: string,
              public icon: string,
              public weatherKind: string,
              public temp:string,
              public tempMax: string,
              public tempMin: string){}
}
