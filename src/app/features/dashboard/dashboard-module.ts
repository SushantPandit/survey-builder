import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    
  ],
  imports: [
    DashboardComponent,
    CommonModule, 
    RouterModule, 
    BarChartComponent,
    PieChartComponent,
    DashboardRoutingModule, 
  ],
})
export class DashboardModule { }
