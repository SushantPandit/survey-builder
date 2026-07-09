import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyBuilderRoutingModule } from './survey-builder-routing-module';
import { SurveyBuilderComponent } from './pages/survey-builder/survey-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SurveyBuilderComponent, SurveyListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SurveyBuilderRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class SurveyBuilderModule {}
