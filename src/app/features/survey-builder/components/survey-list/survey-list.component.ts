import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Survey } from '../../../../core/Models/survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
  standalone: false
})
export class SurveyListComponent {

  @Input({ required: true })
  surveys: Survey[] = [];

  @Output()
  edit = new EventEmitter<Survey>();

  @Output()
  delete = new EventEmitter<number>();

  onEdit(survey: Survey) {
    this.edit.emit(survey);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
