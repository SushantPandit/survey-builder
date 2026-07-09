import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    document.body.innerHTML = '<div id="pieChart"></div>';

    await TestBed.configureTestingModule({
      imports: [PieChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not create an SVG when there is no chart data', () => {
    component.data = [];
    fixture.detectChanges();

    expect(document.querySelector('#pieChart svg')).toBeNull();
  });

  it('should render a pie chart when data is present', () => {
    component.data = [
      { label: 'Text', value: 3 },
      { label: 'Checkbox', value: 2 },
    ];

    fixture.detectChanges();

    expect(document.querySelectorAll('#pieChart svg path').length).toBe(2);
    expect(document.querySelector('#pieChart svg text')?.textContent).toContain('Text (3)');
  });

  it('should recreate the chart when data changes', () => {
    component.data = [{ label: 'Text', value: 1 }];
    fixture.detectChanges();

    expect(document.querySelectorAll('#pieChart svg path').length).toBe(1);

    component.data = [
      { label: 'Text', value: 1 },
      { label: 'Multiple', value: 2 },
    ];

    component.ngOnChanges({
      data: {
        currentValue: component.data,
        previousValue: [{ label: 'Text', value: 1 }],
        firstChange: false,
        isFirstChange: () => false,
      } as any,
    });

    expect(document.querySelectorAll('#pieChart svg path').length).toBe(2);
  });
});
