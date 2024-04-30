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
  toggleTheme() {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      // if current theme is light
      document.querySelector(".sidebar__sun")?.setAttribute("style", "display: none;");
      document.querySelector(".sidebar__moon")?.setAttribute("style", "display: inline-block;");
    } else {
      // if current theme is dark
      document.querySelector(".sidebar__moon")?.setAttribute("style", "display: none;");
      document.querySelector(".sidebar__sun")?.setAttribute("style", "display: inline-block;");
    }
  }
}
