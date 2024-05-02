import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  constructor() { }

  getTemperature() {
    const temperature = 20;
    return temperature;
  }

  getHumidity() {
    const humidity = 30;
    return humidity;
  }

  getPressure() {
    const pressure = 10;
    return pressure;
  }

  getRain() {
    const rain = 100;
    return rain;
  }

  getWindSpeed() {
    const windSpeed = 12;
    return windSpeed;
  }

  getWindDirection() {
    const windDirection = 'N';
    return windDirection;
  }

  getLight() {
    const light = 50;
    return light;
  }

  getPm10() {
    const pm10 = 15;
    return pm10;
  }

  getPm25() {
    const pm25 = 16;
    return pm25;
  }
}
