import { Component, ViewChild} from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { DataChartComponent } from '../data-chart/data-chart.component';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

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
  @ViewChild('tileLowestValue') tileLowesrValue!: TileComponent;
  @ViewChild('tileAverage') tileAverage!: TileComponent;
  @ViewChild('tileMedian') tileMedian!: TileComponent;

  currentChartData!: number[];
  chartDataAverage: number = 0;

  constructor() {}

  ngAfterViewInit() {
    this.dataChart.chartOptions.chart.width = 850;
    this.dataChart.chartOptions.chart.height = 425;

    this.tileHighestValue.tileContent.nativeElement.innerHTML = 'Highest works!';
    this.tileLowesrValue.tileContent.nativeElement.innerHTML = 'Lowest works!';
    this.tileAverage.tileContent.nativeElement.innerHTML = 'Avg works!';
    this.tileMedian.tileContent.nativeElement.innerHTML = 'Median works!';

    this.tileHighestValue.tileContent.nativeElement.innerHTML = this.dataChart.selectedValue;
    console.log(this.dataChart.chartOptions.series[0].data);

    this.currentChartData = this.dataChart.chartOptions.series[0].data;

    this.currentChartData.forEach((value) => this.chartDataAverage += value);

    console.log(this.currentChartData);

    // this.chartDataAverage /= this.currentChartData[0].length;

    this.tileHighestValue.tileContent.nativeElement.innerHTML = this.chartDataAverage;
  }

}
