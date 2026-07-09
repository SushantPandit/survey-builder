import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SurveyStore } from './survey.store';
import { SurveyService } from './survey.service';
import { Survey } from '../Models/survey.model';
import { QuestionType } from '../Models/question.model';

describe('SurveyStore', () => {
  let store: SurveyStore;
  let surveyServiceMock: Partial<SurveyService>;

  beforeEach(() => {
    surveyServiceMock = {
      getAll: () => of([]),
    };

    TestBed.configureTestingModule({
      providers: [
        SurveyStore,
        { provide: SurveyService, useValue: surveyServiceMock },
      ],
    });

    store = TestBed.inject(SurveyStore);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with empty surveys', () => {
    expect(store.surveys()).toEqual([]);
    expect(store.totalSurveys()).toBe(0);
  });

  it('should compute total questions correctly', () => {
    const surveys: Survey[] = [
      {
        id: 1,
        title: 'Test',
        description: 'desc',
        questions: [
          { title: 'Q1', type: QuestionType.TEXT, required: true, options: [] },
          { title: 'Q2', type: QuestionType.CHECKBOX, required: false, options: ['a', 'b'] },
        ],
      },
    ];

    store.surveys.set(surveys);
    expect(store.totalQuestions()).toBe(2);
  });

  it('should compute pieChartData counts by question type', () => {
    store.surveys.set([
      {
        id: 1,
        title: 'Survey 1',
        description: 'desc',
        questions: [
          { title: 'Q1', type: QuestionType.TEXT, required: true, options: [] },
          { title: 'Q2', type: QuestionType.CHECKBOX, required: false, options: ['a', 'b'] },
          { title: 'Q3', type: QuestionType.MULTIPLE, required: false, options: ['x', 'y'] },
        ],
      },
    ]);

    expect(store.pieChartData()).toEqual([
      { label: 'Text', value: 1 },
      { label: 'Multiple Choice', value: 1 },
      { label: 'Checkbox', value: 1 },
    ]);
  });

  it('should compute chartData with deterministic random values', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    store.surveys.set([
      {
        id: 1,
        title: 'Survey 1',
        description: 'desc',
        questions: [
          { title: 'Q1', type: QuestionType.TEXT, required: true, options: [] },
        ],
      },
    ]);

    expect(store.chartData()).toEqual([
      { question: 'Q1', responses: 1 },
    ]);
  });

  it('should load surveys and update loading state', () => {
    const surveys: Survey[] = [
      { id: 1, title: 'Test', description: 'desc', questions: [], },
    ];

    surveyServiceMock.getAll = () => of(surveys);

    store.loadSurveys();

    expect(store.loading()).toBe(false);
    expect(store.surveys()).toEqual(surveys);
  });

  it('should set loading false when loadSurveys fails', () => {
    surveyServiceMock.getAll = () => throwError(() => new Error('network failure'));

    store.loadSurveys();

    expect(store.loading()).toBe(false);
    expect(store.surveys()).toEqual([]);
  });
});
