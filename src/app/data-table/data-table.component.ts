import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleChange, MatButtonToggleModule, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonToggleGroup,
    MatButtonToggleModule,
    MatSelectModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent{
  @ViewChild('table') table!: ElementRef;
  @ViewChild('tableDataFrom') tableDataFrom!: ElementRef;
  @ViewChild('tableDataTo') tableDataTo!: ElementRef;
  @ViewChild('tableSortValue') tableSortValue!: ElementRef;
  @ViewChild('tableSortButton') tableSortOrderButton!: MatButtonToggleGroup;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  weatherDataAll: (string | number)[][] = this.weatherDataService.getAllRecords();
  dataSource = this.weatherDataAll;
  displayedColumns = ['id', 'date', 'time', 'temperature', 'humidity', 'pressure', 'rain', 'windspeed', 'winddirection', 'light', 'pm10', 'pm25'];

  weatherDataSorted: (string | number)[][] = [];
  sortValue: string = 'Id';
  sortOrder: string = 'asc';
  dateFrom: string = '';
  dateTo: string = '';

  // initial table data
  ngAfterViewInit() {
    this.updateTableData();
  }

  updateTableData() {
    this.dataSource = this.weatherDataAll;
  }

  // start date changed
  onSortDataFromChange() {
    this.dateFrom = this.tableDataFrom.nativeElement.value;
    this.updateTableDataSorted();
  }

  // end date changed
  onSortDataToChange() {
    this.dateTo = this.tableDataTo.nativeElement.value;
    this.updateTableDataSorted();
  }

  // sort by changed
  onSortValueChange() {
    this.sortValue = this.tableSortValue.nativeElement.value;
    this.updateTableDataSorted();
  }

  // asc/desc value changed
  onSortOrderChange(event: MatButtonToggleChange) {
    console.log(this.sortOrder.valueOf);
    this.sortOrder = event.value;
    this.updateTableDataSorted();
  }

  // update table data after a change
  updateTableDataSorted(){
    this.weatherDataSorted = [];
    this.dataSource = this.weatherDataService.getSortedRecords(this.sortValue, this.sortOrder, this.dateFrom, this.dateTo);
  }

}
