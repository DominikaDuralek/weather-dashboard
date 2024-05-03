import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewRef, inject } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'

@Component({
  selector: 'tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements AfterViewInit {
  @Input() tileClass!: string;
  @ViewChild('tileText') tileText!: ElementRef;
  @ViewChild('tileContent') tileContent!: ElementRef;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  constructor() {}

  ngAfterViewInit() {
    switch (this.tileClass){
      case 'tileTemperature': {
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[3];
        this.tileText.nativeElement.innerHTML = 'Temperature'; 
        break; 
      }
      case 'tileHumidity': {
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[4];
        this.tileText.nativeElement.innerHTML = 'Humidity'; 
        break; 
      }
      case 'tilePressure': { 
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[5];
        this.tileText.nativeElement.innerHTML = 'Pressure'; 
        break; 
      }
      case 'tileRain': {
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[6];
        this.tileText.nativeElement.innerHTML = 'Rain'; 
        break; 
      }
      case 'tileWindSpeed': { 
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[7];
        this.tileText.nativeElement.innerHTML = 'Wind Speed'; 
        break; 
      }
      case 'tileWindDirection': { 
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[8];
        this.tileText.nativeElement.innerHTML = 'Wind Direction'; 
        break; 
      }
      case 'tileLight': { 
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[9];
        this.tileText.nativeElement.innerHTML = 'Light'; 
        break; 
      }
      case 'tilePm10': {
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[10];
        this.tileText.nativeElement.innerHTML = 'PM 10'; 
        break; 
      }
      case 'tilePm25': {
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[11];
        this.tileText.nativeElement.innerHTML = 'PM 25'; 
        break; 
      }
      default: {
        this.tileContent.nativeElement.innerHTML = 'Unknown';
        this.tileText.nativeElement.innerHTML = 'Unknown'; 
        break; 
      } 
    }

  }
  
}
