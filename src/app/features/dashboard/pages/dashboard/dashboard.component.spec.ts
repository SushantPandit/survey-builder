import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { SurveyStore } from '../../../../core/Services/survey.store';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, BarChartComponent, PieChartComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: SurveyStore,
          useValue: {
            chartData: () => [{ question: 'Q1', responses: 5 }],
            pieChartData: () => [{ label: 'Text', value: 1 }],
            loadSurveys: () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
