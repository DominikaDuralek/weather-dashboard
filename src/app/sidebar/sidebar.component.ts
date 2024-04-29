import { Component, Host, ViewChild } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
}
