import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Config {
  Longitude: number;
  Latitude: number;
  WeatherID: string;
  WeatherMain: string;
  WeatherDescription: string;
  WeatherIcon: string;
  MainTemp: number;
  MainTempF: number;
  //main temp
  MainTempC: number;
  MainTempRVal: number;
  MainTempBVal: number;
  MainPressure: number;
  MainHumidity: number;
  //min temp
  MainTempMin: number;
  MainTempMinF: number;
  MainTempMinC: number;
  MainTempMinRVal: number;
  MainTempMinBVal: number;
  //max temp
  MainTempMax: number;
  MainTempMaxF: number;
  MainTempMaxC: number;
  MainTempMaxRVal: number;
  MainTempMaxBVal: number;
  Visibility: number;
  WindSpeed: number;
  WindDegrees: number;
  Clouds: number;
  DateTime: number;
  Sunrise: number;
  Sunset: number;
  CityName: string;
}

@Injectable({
  providedIn: 'root'
})

export class WeatherfetchService {

  constructor(private http: HttpClient) { }
  
  homeconfigUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=1ebb6e429a3318b80982d77ffcfeb17a&zip=95070,us";
  
  
  currLocation = new Observable ((observer) => {
    navigator.geolocation.getCurrentPosition(position => observer.next(position));
    // observer.complete();
  });
  
  getConfig(url: string) {return this.http.get(url);}
}