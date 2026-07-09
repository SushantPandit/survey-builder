import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SurveyBuilderRoutingModule } from './survey-builder-routing-module';

describe('SurveyBuilderRoutingModule', () => {
  it('should provide RouterModule for survey builder routes', () => {
    TestBed.configureTestingModule({ imports: [SurveyBuilderRoutingModule] });
    expect(TestBed.inject(RouterModule)).toBeTruthy();
  });
});
