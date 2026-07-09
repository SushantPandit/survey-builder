import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    document.body.innerHTML = '<div id="barChart"></div>';

    await TestBed.configureTestingModule({
      imports: [BarChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create', () => {
    component.data = [{ question: 'Q1', responses: 10 }];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a bar chart with one bar', () => {
    component.data = [{ question: 'Q1', responses: 10 }];
    fixture.detectChanges();

    expect(document.querySelectorAll('#barChart svg rect').length).toBe(1);
    expect(document.querySelector('#barChart svg text.bar-label')?.textContent).toContain('10');
  });

  it('should recreate the chart when data changes', () => {
    component.data = [{ question: 'Q1', responses: 10 }];
    fixture.detectChanges();

    component.data = [
      { question: 'Q1', responses: 10 },
      { question: 'Q2', responses: 5 },
    ];

    component.ngOnChanges({
      data: {
        currentValue: component.data,
        previousValue: [{ question: 'Q1', responses: 10 }],
        firstChange: false,
        isFirstChange: () => false,
      } as any,
    });

    expect(document.querySelectorAll('#barChart svg rect').length).toBe(2);
  });
});
