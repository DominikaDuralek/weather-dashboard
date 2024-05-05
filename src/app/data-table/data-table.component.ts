import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonToggleModule,
    MatButtonToggleGroup
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent{
  @ViewChild('table') table!: ElementRef;
  // @ViewChild('tableSortButton') tableSortButton!: MatButtonToggleModule;
  @ViewChild('tableSortButton') tableSortButton!: MatButtonToggleGroup;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  // constructor() {
  //   console.log(this.tableSortButton.value);
  // }

  ngAfterViewInit() {
    // Accessing the value of the MatButtonToggleGroup
    console.log(this.tableSortButton.value);
  }

  weatherDataAll: (string | number)[][] = this.weatherDataService.getAllRecords();
  displayedColumns = ['id', 'date', 'time', 'temperature', 'humidity', 'pressure', 'rain', 'windspeed', 'winddirection', 'light', 'pm10', 'pm25'];
  dataSource = this.weatherDataAll;
}
