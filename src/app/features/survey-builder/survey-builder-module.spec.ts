import { TestBed } from '@angular/core/testing';
import { SurveyBuilderModule } from './survey-builder-module';

describe('SurveyBuilderModule', () => {
  it('should instantiate without errors', () => {
    TestBed.configureTestingModule({ imports: [SurveyBuilderModule] });
    expect(TestBed.inject(SurveyBuilderModule)).toBeTruthy();
  });
});
