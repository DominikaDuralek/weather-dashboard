import { Routes } from '@angular/router';
import { ContentTodayComponent } from './content-today/content-today.component';
import { ContentTablesComponent } from './content-tables/content-tables.component';
import { ContentChartsComponent } from './content-charts/content-charts.component';

const routeConfig: Routes = [
    {
      path: 'today',
      component: ContentTodayComponent,
      title: 'Weather - Today'
    },
    {
      path: 'tables',
      component: ContentTablesComponent,
      title: 'Weather - Tables'
    },
    {
      path: 'charts',
      component: ContentChartsComponent,
      title: 'Weather - Charts'
    },
    {
      path: '',
      redirectTo: 'today',
      pathMatch: 'full'
    }
  ];
  
  export default routeConfig;