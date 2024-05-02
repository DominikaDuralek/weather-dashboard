import { Component } from '@angular/core';
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
export class ContentTodayComponent {

}
