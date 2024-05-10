import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import ApexCharts from 'apexcharts';
import { setEngine } from 'crypto';

@Component({
  selector: 'data-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './data-chart.component.html',
  styleUrl: './data-chart.component.css'
})
export class DataChartComponent {
  @ViewChild('chartValue') chartValue!: ElementRef;
  @ViewChild('chartType') chartType!: ElementRef;
  @ViewChild('dayPicker') dayPicker!: ElementRef;
  @ViewChild('weekPicker') weekPicker!: ElementRef;
  @ViewChild('apexChart') apexChart!: ChartComponent;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  chartOptions: any;
  selectedValue: number = 3;
  selectedType: string = 'Day';
  // Set base day/week (today)
  dateToday: Date = new Date();
  selectedDay: string = this.dateToday.getFullYear() + '-' + (this.dateToday.getMonth() + 1).toString().padStart(2, '0') + '-' + this.dateToday.getDate().toString().padStart(2, '0');
  selectedWeek: string = getWeekNumber(this.selectedDay);
  
  constructor() {
    this.chartOptions = {
      chart: {
        height: 250,
        width: 500,
        type: 'line',
      },
      series: [
        {
          name: 'Values',
          data: this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[2])
        }
      ],
      xaxis: {
        categories: this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[1]),
      },
    };
  }

  ngAfterViewInit() {
    this.dayPicker.nativeElement.value = this.selectedDay;
  }

  onSelectedValueChanged() {
    this.selectedValue = this.chartValue.nativeElement.value;
    this.updateChartData();
  }

  onSelectedTypeChanged() {
    this.selectedType = this.chartType.nativeElement.value;
    if (this.selectedType == 'Week') {
      // Show weekPicker, hide dayPicker
      document.querySelector(".dayPicker")?.setAttribute("style", "display: none;");
      document.querySelector(".weekPicker")?.setAttribute("style", "display: inline-block;");
      this.weekPicker.nativeElement.value = this.selectedWeek;
    } else {
      // Show dayPicker, hide weekPicker
      document.querySelector(".weekPicker")?.setAttribute("style", "display: none;");
      document.querySelector(".dayPicker")?.setAttribute("style", "display: inline-block;");
      this.dayPicker.nativeElement.value = this.selectedDay;
    }

    this.updateChartData();
  }

  onSelectedDayChanged() {
    this.selectedDay = this.dayPicker.nativeElement.value;
    this.updateChartData();
  }

  onSelectedWeekChanged() {
    this.selectedWeek = this.weekPicker.nativeElement.value;
    this.updateChartData();
  }

  updateChartData() {
    let valuesArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[2]);
    let xaxisArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[1]);

    // Update chartOptions with the new data
    this.chartOptions = {
      ...this.chartOptions,
      series: [{ data: valuesArray }],
      xaxis: { categories: xaxisArray }
    };

    // Manually trigger update/rendering of the chart
    this.apexChart.updateOptions(this.chartOptions);
  }

}

function getWeekNumber(dateString: string): string {
  const date = new Date(dateString);
  // Adjust the date to Thursday of the same week to make the calculation more accurate
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate the week number
  const weekNumber = Math.ceil((((+date - +yearStart) / 86400000) + 1) / 7);
  const weekNumberString = date.getFullYear() + "-W" + weekNumber;

  return weekNumberString;
}

