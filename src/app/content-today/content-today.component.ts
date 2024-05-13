import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { DataChartComponent } from '../data-chart/data-chart.component';

@Component({
  selector: 'content-today',
  standalone: true,
  imports: [
    TileComponent,
    DataTableComponent,
    DataChartComponent
  ],
  templateUrl: './content-today.component.html',
  styleUrl: './content-today.component.css'
})
export class ContentTodayComponent{
  @ViewChild('todayTable') todayTable!: DataTableComponent;
  @ViewChild('todayChart') todayChart!: DataChartComponent;
  currentDate!: string;
  currentTime!: string;
  private intervalId: any;

  ngOnInit() {
    this.updateDateTime();

    // Update every second
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  ngAfterViewInit() {
    this.todayTable.tableDataFrom.nativeElement.setAttribute("style", "display: none;");
    this.todayTable.tableDataFromLabel.nativeElement.setAttribute("style", "display: none;");
    this.todayTable.tableDataTo.nativeElement.setAttribute("style", "display: none;");
    this.todayTable.tableDataToLabel.nativeElement.setAttribute("style", "display: none;");

    this.todayChart.chartType.nativeElement.setAttribute("style", "display: none;")
    this.todayChart.dayPicker.nativeElement.setAttribute("style", "display: none;")
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDate = this.formatDate(now);
    this.currentTime = this.formatTime(now);
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
