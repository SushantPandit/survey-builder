import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SurveyListComponent } from './survey-list.component';

describe('SurveyListComponent', () => {
  let component: SurveyListComponent;
  let fixture: ComponentFixture<SurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyListComponent, MatCardModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyListComponent);
    component = fixture.componentInstance;
    component.surveys = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
