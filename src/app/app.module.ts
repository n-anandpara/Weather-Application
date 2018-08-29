import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import { weatherRouting } from './weather.routing';
import { ResolveLocationService } from './resolve-location.service'
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    weatherRouting,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [WeatherService, ResolveLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
