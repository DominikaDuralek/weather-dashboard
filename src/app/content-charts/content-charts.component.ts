import { Component } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { DataChartComponent } from '../data-chart/data-chart.component';

@Component({
  selector: 'content-charts',
  standalone: true,
  imports: [
    TileComponent,
    DataChartComponent
  ],
  templateUrl: './content-charts.component.html',
  styleUrl: './content-charts.component.css'
})
export class ContentChartsComponent {

}
