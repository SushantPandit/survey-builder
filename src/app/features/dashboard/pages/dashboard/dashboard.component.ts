import { Component, inject, OnInit } from '@angular/core';
import { Survey } from '../../../../core/Models/survey.model';
import { SurveyStore } from '../../../../core/Services/survey.store';
import { SurveyService } from '../../../../core/Services/survey.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    BarChartComponent,
    PieChartComponent,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private surveyStore = inject(SurveyStore);
  surveyService = inject(SurveyService);
  readonly chartData = this.surveyStore.chartData;
  readonly piaChartData = this.surveyStore.pieChartData;


  ngOnInit(): void {
    this.surveyStore.loadSurveys();
  }
}
