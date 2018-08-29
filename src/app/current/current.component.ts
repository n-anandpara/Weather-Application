import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';

@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
myWeather:CurrentWeather;
  constructor(private ws:WeatherService, private route:ActivatedRoute) { }

  ngOnInit(){
    this.route.data.subscribe(
      (data:{myWeather:CurrentWeather}) => {
        this.myWeather = data.myWeather;
      }
    )
  }


onSubmit(weatherForm:NgForm){
  this.ws.anotherCityWeather(weatherForm.value.city).subscribe(
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
    }
  )

}

  /*ngOnInit() {
  this.myWeather = this.ws.weatherNow();
  navigator.geolocation.getCurrentPosition((pos) => {
  this.location = pos.coords;
  console.log(this.location);
  const lat = this.location.latitude;
  const lon = this.location.longitude;
  this.ws.localWeather(lat, lon).subscribe(
    (data) => {
      console.log(data);
      this.myWeather = new CurrentWeather(data.name,
                                          data.coord.lat,
                                          data.coord.lon,
                                          data.weather[0].icon,
                                          data.weather[0].description,
                                          data.main.temp,
                                          data.main.temp_max,
                                          data.main.temp_min)
    })
  })
  }
*/


}
