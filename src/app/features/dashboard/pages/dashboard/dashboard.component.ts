import { Component, inject, OnInit } from '@angular/core';
import { Survey } from '../../../../core/Models/survey.model';
import { SurveyStore } from '../../../../core/Services/survey.store';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private surveyStore = inject(SurveyStore);
  readonly chartData = this.surveyStore.chartData;
  readonly piaChartData = this.surveyStore.pieChartData;
  
  
  ngOnInit(): void {
    this.surveyStore.loadSurveys();
  }
}
