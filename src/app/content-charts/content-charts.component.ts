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

  constructor() {}

  ngAfterViewInit() {
    this.dataChart.chartOptions.chart.width = 900;
    this.dataChart.chartOptions.chart.height = 450;
  }

}
