import { Component } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'content-tables',
  standalone: true,
  imports: [
    DataTableComponent
  ],
  templateUrl: './content-tables.component.html',
  styleUrl: './content-tables.component.css'
})
export class ContentTablesComponent {

}
