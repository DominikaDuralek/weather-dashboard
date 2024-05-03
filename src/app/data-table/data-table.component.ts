import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent{
  @ViewChild('table') table!: ElementRef;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  constructor() {}

  weatherDataAll: (string | number)[][] = this.weatherDataService.getAllRecords();
  displayedColumns = ['id', 'date', 'time', 'temperature', 'humidity', 'pressure', 'rain', 'windspeed', 'winddirection', 'light', 'pm10', 'pm25'];
  dataSource = this.weatherDataAll;
}
