import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import ApexCharts from 'apexcharts';

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
  @ViewChild('apexChart') apexChart!: ChartComponent;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  chartOptions: any;
  selectedValue: string = 'Temperature';
  selectedType: string = 'Day';

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
          data: [30, 40, 35, 50, 49, 60, 70, 91, 400, 350, 340, 300]
        }
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    };
  }

  onSelectedValueChanged() {
    this.selectedValue = this.chartValue.nativeElement.value;
    this.updateChartData();
  }

  onSelectedTypeChanged() {
    this.selectedType = this.chartType.nativeElement.value;
    this.updateChartData();
  }

  updateChartData() {
    let valuesArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType).map(record => [record[2]]);
    let xaxisArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType).map(record => [record[1]]);

    // Update chartOptions with the new data
    this.chartOptions = {
      ...this.chartOptions,
      series: [{ data: valuesArray }],
      xaxis: { categories: xaxisArray }
    };
  
    // Manually trigger update/rendering of the chart
    this.apexChart.updateOptions(this.chartOptions);
    console.log(this.chartOptions);
  }

}
