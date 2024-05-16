import { Component, ViewChild} from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { DataChartComponent } from '../data-chart/data-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: 'content-charts',
  standalone: true,
  imports: [
    TileComponent,
    DataChartComponent,
    NgApexchartsModule
  ],
  templateUrl: './content-charts.component.html',
  styleUrl: './content-charts.component.css'
})
export class ContentChartsComponent {
  @ViewChild('dataChart') dataChart!: DataChartComponent;
  @ViewChild('tileHighestValue') tileHighestValue!: TileComponent;
  @ViewChild('tileLowestValue') tileLowestValue!: TileComponent;
  @ViewChild('tileAverage') tileAverage!: TileComponent;
  @ViewChild('tileMedian') tileMedian!: TileComponent;

  currentChartData!: number[];
  currentChartDataSorted!: number[];
  chartDataHighestValue!: number;
  chartDataLowestValue!: number;
  chartDataAverage: number = 0;
  chartDataMedian!: number;

  constructor() {}

  handleChartDataUpdate(chartData: number[]) {
    this.currentChartData = chartData;
    this.tileHighestValue.tileContentValue.nativeElement.innerHTML = Math.max(...this.currentChartData).toFixed(1);
    this.tileLowestValue.tileContentValue.nativeElement.innerHTML = Math.min(...this.currentChartData).toFixed(1);
    this.tileAverage.tileContentValue.nativeElement.innerHTML = this.calculateAverage(this.currentChartData).toFixed(1);
    this.tileMedian.tileContentValue.nativeElement.innerHTML = this.calculateMedian(this.currentChartData).toFixed(1);
  }

  ngAfterViewInit() {
    // this.dataChart.chartOptions.chart.width = 850;
    // this.dataChart.chartOptions.chart.height = 425;
  
    // Create a copy of the chart data before sorting
    this.currentChartData = [...this.dataChart.chartOptions.series[0].data];
    this.currentChartDataSorted = this.currentChartData.slice().sort((a, b) => a - b);
  
    this.updateTiles();
  }

  updateTiles() {
    // Update tile content with the new chart data
    this.tileHighestValue.tileContentValue.nativeElement.innerHTML = Math.max(...this.currentChartData).toFixed(1);
    this.tileLowestValue.tileContentValue.nativeElement.innerHTML = Math.min(...this.currentChartData).toFixed(1);
    this.tileAverage.tileContentValue.nativeElement.innerHTML = this.calculateAverage(this.currentChartData).toFixed(1);
    this.tileMedian.tileContentValue.nativeElement.innerHTML = this.calculateMedian(this.currentChartData).toFixed(1);
  }

  calculateAverage(data: number[]): number {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
  }

  calculateMedian(data: number[]): number {
    const sortedData = data.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);
  
    if (sortedData.length % 2 === 0) {
      const middleValue1 = sortedData[middleIndex - 1];
      const middleValue2 = sortedData[middleIndex];
      return (middleValue1 + middleValue2) / 2;
    } else {
      return sortedData[middleIndex];
    }
  }

}
