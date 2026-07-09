import { Injectable, computed, inject, signal } from '@angular/core';
import { SurveyService } from './survey.service';
import { Survey } from '../Models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyStore {

  private surveyService = inject(SurveyService);
  // State
  readonly surveys = signal<Survey[]>([]);
  readonly selectedSurvey = signal<Survey | null>(null);
  readonly loading = signal(false);

  // Computed values
  readonly totalSurveys = computed(() => this.surveys().length);

  readonly totalQuestions = computed(() =>
    this.surveys().reduce((total, survey) => total + survey.questions.length, 0)
  );

  readonly chartData = computed(() => {
    return this.surveys()
      .flatMap(survey =>
        survey.questions.map(question => ({
          question: question.title,
          responses: Math.floor(Math.random() * 50) + 1
        }))
      );
  });

  readonly pieChartData = computed(() => {
    const questions = this.surveys()
      .flatMap(survey => survey.questions);
    const result = [
      {
        label: 'Text',
        value: questions.filter(q => q.type === 'TEXT').length
      },
      {
        label: 'Multiple Choice',
        value: questions.filter(q => q.type === 'MULTIPLE').length
      },
      {
        label: 'Checkbox',
        value: questions.filter(q => q.type === 'CHECKBOX').length
      }
    ];
    return result;
  });

  loadSurveys(): void {
    this.loading.set(true);
    this.surveyService.getAll().subscribe({
      next: (response) => {
        this.surveys.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }


}