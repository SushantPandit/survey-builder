import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyBuilderComponent } from './survey-builder.component';

describe('SurveyBuilderComponent', () => {
  let component: SurveyBuilderComponent;
  let fixture: ComponentFixture<SurveyBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyBuilderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
