import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Forecast } from '../forecast';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  @ViewChild('myCanvas') myCanvas: ElementRef;
    public context: CanvasRenderingContext2D;
    
  chart: any;
  constructor(private weatherService:WeatherService) { }

  forecastForm: FormGroup;
  cityForecast: Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    })
  }




  onSubmit(){
    this.weatherService.fiveDayForecast(this.forecastForm.value.forecastCity).subscribe(
      (res) => {
        console.log(res);
        /*for(let i = 0; i < data.list.length; i++) {
          const temporary = new Forecast(data.list.[i].dt_txt,
                                          data.list[i].weather[0].icon,
                                          data.list[i].main.temp_max,
                                          data.list[i].main.temp_min);
          this.cityForecast.push(temporary);
        }
        console.log(this.cityForecast);

          let tempMax = res['list'].map(res => res.main.temp);
          let dt_txt = res['list'].map(res => res.dt_txt);


          this.chart = new Chart('canvas',{
            type: 'line',

            data: {
              labels: dt_txt,
              datasets: [
                {
                  data: tempMax,
                  borderColor: '#3cba9f',
                  fill: false
                },
              ]
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: 'Temp vs Time'
              },
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }]
              }
            }
          })*/

                  let temp_max = res['list'].map(res => res.main.temp_max);
                  let temp_min = res['list'].map(res => res.main.temp_min);
                  let alldates = res['list'].map(res => res.dt)

                  let weatherDates = []
                  alldates.forEach((res) => {
                      let jsdate = new Date(res * 1000)
                      weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
                  })

                  this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
                  this.chart = new Chart(this.context, {
                      type: 'line',
                      data: {
                        labels: weatherDates,
                        datasets: [
                          {
                            data: temp_max,
                            borderColor: "#3cba9f",
                            fill: false
                          },
                          {
                            data: temp_min,
                            borderColor: "#ffcc00",
                            fill: false
                          },
                        ]
                      },
                      options: {
                        legend: {
                          display: false
                        },
                        scales: {
                          xAxes: [{
                            display: true
                          }],
                          yAxes: [{
                            display: true
                          }],
                        }
                      }
                    });



        });
  }
}
