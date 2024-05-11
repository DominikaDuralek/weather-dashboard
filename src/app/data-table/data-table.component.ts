import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleChange, MatButtonToggleModule, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';

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
export class DataTableComponent {
  @ViewChild('table') table!: ElementRef;
  @ViewChild('tableDataFrom') tableDataFrom!: ElementRef;
  @ViewChild('tableDataTo') tableDataTo!: ElementRef;
  @ViewChild('tableSortValue') tableSortValue!: ElementRef;
  @ViewChild('tableSortButton') tableSortOrderButton!: MatButtonToggleGroup;

  weatherDataService: WeatherDataService = inject(WeatherDataService);
  _dataSource: any[][] = [];

  set dataSource(data: any[][]) {
    this._dataSource = data;
  }

  get dataSource(): any[][] {
    return this._dataSource;
  }
  displayedColumns = ['id', 'date', 'time', 'temperature', 'humidity', 'pressure', 'rain', 'windspeed', 'winddirection', 'light', 'pm10', 'pm25'];

  weatherDataSorted: (string | number)[][] = [];
  sortValue: number = 0;
  sortOrder: string = 'asc';
  // Set base day/week (today)
  dateToday: Date = new Date();
  dateFrom: string = this.dateToday.getFullYear() + '-' + (this.dateToday.getMonth() + 1).toString().padStart(2, '0') + '-' + this.dateToday.getDate().toString().padStart(2, '0');
  dateTo: string = this.dateToday.getFullYear() + '-' + (this.dateToday.getMonth() + 1).toString().padStart(2, '0') + '-' + this.dateToday.getDate().toString().padStart(2, '0');

  constructor(private cdRef: ChangeDetectorRef) { }

  // Initial table data
  ngAfterViewInit() {
    this.tableDataFrom.nativeElement.value = this.dateFrom;
    this.tableDataTo.nativeElement.value = this.dateTo;
    this.updateTableDataSorted();
  }

  // Start date changed
  onSortDataFromChange() {
    this.dateFrom = this.tableDataFrom.nativeElement.value;
    this.updateTableDataSorted();
  }

  // End date changed
  onSortDataToChange() {
    this.dateTo = this.tableDataTo.nativeElement.value;
    this.updateTableDataSorted();
  }

  // Sort by changed
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

  // Update table data after a change
  updateTableDataSorted() {
    this.weatherDataSorted = [];
    this.dataSource = this.weatherDataService.getRecordsTable(this.sortValue, this.sortOrder, this.dateFrom, this.dateTo);
    // Manually trigger change detection
    this.cdRef.detectChanges();
  }

}
