import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { CurrentWeather } from './current-weather';
import { Forecast } from './forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  myWeather:CurrentWeather;
    location
  constructor(private http:Http) {
  }

/*  weatherNow(){
    return this.current;
  }

localWeather(lat:string, lon:string){
  return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=16e871e1ec2d2b44dde125f0274ded9f&units=imperial`).map(res => res.json());
}*/

localWeather(){
  return new Promise ((res, rej) => {
    navigator.geolocation.getCurrentPosition((pos) => {
    this.location = pos.coords;
    const lat = this.location.latitude;
    const lon = this.location.longitude;
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=16e871e1ec2d2b44dde125f0274ded9f&units=imperial`)
    .map(res => res.json()).toPromise().then(
      (data) => {
        console.log(data);
        this.myWeather = new CurrentWeather(data.name,
                                            data.coord.lat,
                                            data.coord.lon,
                                            data.weather[0].icon,
                                            data.weather[0].description,
                                            data.main.temp,
                                            data.main.temp_max,
                                            data.main.temp_min);
        res(this.myWeather);
      }
    )
    })
  })
}




anotherCityWeather(city:string){
  return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16e871e1ec2d2b44dde125f0274ded9f&units=imperial`).map(res => res.json());
}


  fiveDayForecast(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=16e871e1ec2d2b44dde125f0274ded9f&units=imperial`).map(res => res.json());
  }
}
