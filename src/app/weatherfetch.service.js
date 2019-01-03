"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var WeatherfetchService = (function () {
    function WeatherfetchService(http) {
        this.http = http;
        this.configUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=1ebb6e429a3318b80982d77ffcfeb17a";
        this.homeconfigUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=1ebb6e429a3318b80982d77ffcfeb17a&zip=95070,us";
    }
    // (if navigator.geolocation) {
    //   configUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=1ebb6e429a3318b80982d77ffcfeb17a&lat=" + 
    //   (navigator.geolocation.getCurrentPosition()).coords.latitude + "&lon=" +
    //   (navigator.geolocation.getCurrentPosition()).coords.longitude + ;
    // } else {
    //   configUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=1ebb6e429a3318b80982d77ffcfeb17a&zip=95070,us";
    // }
    WeatherfetchService.prototype.getConfig = function () {
        // if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition((position) => {
        // this.lat = "" + position.coords.latitude;
        // this.lon = "" + position.coords.longitude;
        // this.configUrl = this.configUrl + "&lat=" + this.lat + "&lon=" + this.lon;
        return this.http.get(this.homeconfigUrl);
    };
    WeatherfetchService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], WeatherfetchService);
    return WeatherfetchService;
}());
exports.WeatherfetchService = WeatherfetchService;
