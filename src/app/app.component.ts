import { Component, OnInit } from '@angular/core';
import { WeatherfetchService, Config } from './weatherfetch.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  configUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=1ebb6e429a3318b80982d77ffcfeb17a";
  rgbText = "color:RGB(0,0,0);";
  rgbTextSafe;
  rgbTextMin = "color:RGB(0,0,0);";
  rgbTextMinSafe;
  rgbTextMax = "color:RGB(0,0,0);";
  rgbTextMaxSafe;
  config: Config = {
    Longitude:0,
    Latitude:0,
    WeatherID:"",
    WeatherMain:"",
    WeatherDescription:"",
    WeatherIcon:"",
    //main temp
    MainTemp:0,
    MainTempF:0,
    MainTempC:0,
    MainTempRVal:0,
    MainTempBVal:0,
    
    MainPressure:0,
    MainHumidity:0,
    //min temp
    MainTempMin:0,
    MainTempMinF:0,
    MainTempMinC:0,
    MainTempMinRVal:0,
    MainTempMinBVal:0,
    
    //max temp
    MainTempMax:0,
    MainTempMaxF:0,
    MainTempMaxC:0,
    MainTempMaxRVal:0,
    MainTempMaxBVal:0,
    
    Visibility:0,
    WindSpeed:0,
    WindDegrees:0,
    Clouds:0,
    DateTime:0,
    Sunrise:0,
    Sunset:0,
    CityName:""
  };
  lat = "";
  lon = "";
  
  observer = {
    next: position => {
      this.lat = ("" + position.coords.latitude);
      this.lon = ("" + position.coords.longitude);
      this.configUrl = this.configUrl + "&lat=" + this.lat + "&lon=" + this.lon;
      // console.log(this.configUrl);
      this.showConfig(this.configUrl);
    },
    error: err => {alert("There was an error fetching geolocation data. Please ensure you are using a geolocation-enabled browser.");}
  };
  
  ngOnInit() {
    this.rgbTextSafe = this.sanitize.bypassSecurityTrustStyle(this.rgbText);
    this.rgbTextMinSafe = this.sanitize.bypassSecurityTrustStyle(this.rgbTextMin);
    this.rgbTextMaxSafe = this.sanitize.bypassSecurityTrustStyle(this.rgbTextMax);
    this.weatherfetchService.currLocation.subscribe(this.observer);
  }
  
  constructor(
    private weatherfetchService: WeatherfetchService,
    private sanitize: DomSanitizer
    ) { }
  
  showConfig(url: string) {
    this.weatherfetchService.getConfig(url)
    .subscribe((data: any) => {
      // build data set
      this.config.Longitude = data.coord.lon;
      this.config.Latitude = data.coord.lat;
      this.config.WeatherID = data.weather[0].id;
      this.config.WeatherMain = data.weather[0].main;
      this.config.WeatherDescription = data.weather[0].description;
      this.config.WeatherIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      //main temp
      this.config.MainTemp = data.main.temp;
      this.config.MainTempF = Math.round(((data.main.temp - 273.15) * 9 / 5 + 32)*10)/10;
      this.config.MainTempC = Math.round((data.main.temp - 273.15)*10)/10;
      //color assigment logic
      //scales RBG based on Celsius 0 > 35 degrees
      //RGB(R,0,B) :: R+G+B = 255
      if (this.config.MainTempC > 35) {this.config.MainTempRVal = 255;}
      else if (this.config.MainTempC < 0) {this.config.MainTempRVal = 0;}
      else {this.config.MainTempRVal = Math.round(255*(this.config.MainTempC/35));}
      this.config.MainTempBVal = 255 - this.config.MainTempRVal;
      this.rgbText = "color:RGB(" + this.config.MainTempRVal + ",0," + this.config.MainTempBVal + ");";
      this.rgbTextSafe = this.sanitize.bypassSecurityTrustStyle(this.rgbText);
      // console.log("****************");
      // console.log(this.rgbText);
      // console.log(this.config.MainTempRVal);
      // console.log(this.config.MainTempBVal);
      // console.log("****************");
      
      this.config.MainPressure = data.main.pressure;
      this.config.MainHumidity = data.main.humidity;
      
      //min temp
      this.config.MainTempMin = data.main.temp_min;
      this.config.MainTempMinF = Math.round(((data.main.temp_min - 273.15) * 9 / 5 + 32)*10)/10;;
      this.config.MainTempMinC = Math.round((data.main.temp_min - 273.15)*10)/10;;
      //scales RBG based on Celsius 0 > 35 degrees
      //RGB(R,0,B) :: R+G+B = 255
      if (this.config.MainTempMinC > 35) {this.config.MainTempMinRVal = 255;}
      else if (this.config.MainTempMinC < 0) {this.config.MainTempMinRVal = 0;}
      else {this.config.MainTempMinRVal = Math.round(255*(this.config.MainTempMinC/35));}
      this.config.MainTempMinBVal = 255 - this.config.MainTempMinRVal;
      this.rgbTextMin = "color:RGB(" + this.config.MainTempMinRVal + ",0," + this.config.MainTempMinBVal + ");";
      this.rgbTextMinSafe = this.sanitize.bypassSecurityTrustStyle(this.rgbTextMin);
      // console.log("****************");
      // console.log(this.rgbTextMin);
      // console.log(this.config.MainTempMinRVal);
      // console.log(this.config.MainTempMinBVal);
      // console.log("****************");
      
      //max temp
      this.config.MainTempMax = data.main.temp_max;
      this.config.MainTempMaxF = Math.round(((data.main.temp_max - 273.15) * 9 / 5 + 32)*10)/10;;
      this.config.MainTempMaxC = Math.round((data.main.temp_max - 273.15)*10)/10;;
      //scales RBG based on Celsius 0 > 35 degrees
      //RGB(R,0,B) :: R+G+B = 255
      if (this.config.MainTempMaxC > 35) {this.config.MainTempMaxRVal = 255;}
      else if (this.config.MainTempMaxC < 0) {this.config.MainTempMaxRVal = 0;}
      else {this.config.MainTempMaxRVal = Math.round(255*(this.config.MainTempMaxC/35));}
      this.config.MainTempMaxBVal = 255 - this.config.MainTempMaxRVal;
      this.rgbTextMax = "color:RGB(" + this.config.MainTempMaxRVal + ",0," + this.config.MainTempMaxBVal + ");";
      this.rgbTextMaxSafe = this.sanitize.bypassSecurityTrustStyle(this.rgbTextMax);
      // console.log("****************");
      // console.log(this.rgbTextMax);
      // console.log(this.config.MainTempMaxRVal);
      // console.log(this.config.MainTempMaxBVal);
      // console.log("****************");
      
      this.config.Visibility = data.visibility;
      this.config.WindSpeed = Math.round((data.wind.speed * 2.236936)*10)/10; // converts meters per second to mph
      this.config.WindDegrees = Math.round(data.wind.deg);
      this.config.DateTime = data.dt;
      this.config.Sunrise = data.sys.sunrise;
      this.config.Sunset = data.sys.sunset;
      this.config.CityName = data.name;
      
      // console.log(this.config);
    });
  }
}