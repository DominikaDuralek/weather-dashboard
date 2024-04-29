import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component'
import { ContentTablesComponent } from './content-tables/content-tables.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    SidebarComponent,
    ContentTablesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Weather Dashboard';
}
