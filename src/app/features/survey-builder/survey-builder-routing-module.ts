import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyBuilderComponent } from './pages/survey-builder/survey-builder.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyBuilderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyBuilderRoutingModule {}
