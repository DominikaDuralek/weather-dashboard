import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDataService } from '../weather-data.service';

import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import ApexCharts from 'apexcharts';
import { setEngine } from 'crypto';

@Component({
  selector: 'tile',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements AfterViewInit {
  @Input() tileClass!: string;
  @ViewChild('tileText') tileText!: ElementRef;
  @ViewChild('tileContent') tileContent!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  constructor() {
  }

  ngAfterViewInit() {
    switch (this.tileClass){
      case 'tileTemperature': {
        this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[3];
        this.tileText.nativeElement.innerHTML = 'Temperature'; 
        break; 
      }
      case 'tileHumidity': {
        this.renderPieChart();
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

  renderPieChart() {
    const chartOptions = {
      series: [+this.weatherDataService.getNewestRecord()[4], (100 - (+this.weatherDataService.getNewestRecord()[4]))],
      chart: {
        type: 'pie'
      },
      labels: ['Humidity', ''],
      dataLabels: {
        enabled: true,
        formatter: function(val: string, opts: { seriesIndex: number; }) {
          if (opts.seriesIndex === 0) {
            // Show percentage only for the humidity segment
            return val + '%';
          } else {
            // Hide label for the remaining segment
            return '';
          }
        },
        style: {
          fontSize: '16px',
        }
      },
      legend: {
        show: false // Hide the legend
      },
      colors: ['#3AB6F0', 'rgba(0, 0, 0, 0)'],
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -30,
          }
        }
      },
      stroke: {
        // Outline
        colors: ['#e2e8f0'],
        width: 1,
      }
    };
    const chart = new ApexCharts(this.pieChart.nativeElement, chartOptions);
    chart.render();
  }
  
}
