import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SurveyBuilderComponent } from './survey-builder.component';
import { SurveyStore } from '../../../../core/Services/survey.store';
import { SurveyService } from '../../../../core/Services/survey.service';

describe('SurveyBuilderComponent', () => {
  let component: SurveyBuilderComponent;
  let fixture: ComponentFixture<SurveyBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyBuilderComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: SurveyService,
          useValue: {
            create: () => of({}),
            update: () => of({}),
            delete: () => of({}),
          },
        },
        {
          provide: SurveyStore,
          useValue: {
            surveys: () => [],
            totalSurveys: () => 0,
            loadSurveys: () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
