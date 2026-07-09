import { Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Question, QuestionType } from '../../../../core/Models/question.model';
import { minimumOptionsValidator } from '../../../../shared/Validators/minimum-options.validator';
import { questionValidator } from '../../../../shared/Validators/question.validator';
import { SurveyService } from '../../../../core/Services/survey.service';
import { Survey } from '../../../../core/Models/survey.model';
import { SurveyStore } from '../../../../core/Services/survey.store';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrl: './survey-builder.component.scss',
  standalone: false,
})
export class SurveyBuilderComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  surveyService = inject(SurveyService);
  private surveyStore = inject(SurveyStore);
  editingSurveyId: number | null = null;

  readonly surveys = this.surveyStore.surveys;
  readonly totalSurveys = this.surveyStore.totalSurveys;

  //creating form for survey builder
  surveyForm = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    questions: this.fb.array<FormGroup>([]), // it will start with empty list of questions.
  });


  //creating getter to get questions form array
  get questions(): FormArray<FormGroup> {
    return this.surveyForm.get('questions') as FormArray<FormGroup>;
  }


  ngOnInit(): void {
    this.surveyStore.loadSurveys();
  }

  //nested form group for questions and options
  // creating method to create question form group
  private createQuestion(question?: Question): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      type: [QuestionType.TEXT],
      required: [false],
      options: this.fb.array<string[]>([]),
    },
      {
        validators: [
          minimumOptionsValidator(),
          questionValidator()
        ]
      });
  }

  //creating method to add question to the form array
  addQuestion() {
    this.questions.push(this.createQuestion());
    console.log(this.surveyForm.value);
  }

  //handling question Removal.
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.fb.control('', Validators.required));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  //When the user changes the type to Multiple Choice or Checkbox, automatically create two empty options.
  onQuestionTypeChange(index: number): void {
    const question = this.questions.at(index);
    const options = this.getOptions(index);
    const type = question.get('type')?.value;

    options.clear();

    if (type === 'MULTIPLE' ||
      type === 'CHECKBOX') {
      options.push(this.fb.control(''));
      options.push(this.fb.control(''));
    }
  }

  saveSurvey(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const surveyData: Survey = this.surveyForm.getRawValue() as Survey;

    if (this.editingSurveyId) {
      this.surveyService.update(
        this.editingSurveyId,
        surveyData
      ).subscribe({
        next: () => {
          alert('Survey Updated');
          this.resetForm();
        }
      });
    } else {
      this.surveyService.create(
        surveyData
      ).subscribe({
        next: () => {
          alert('Survey Created');
          this.resetForm();
        }
      });

    }

  }
  resetForm() {
    this.surveyForm.reset();
    this.questions.clear();
    this.editingSurveyId = null;
    this.surveyStore.loadSurveys();
  }

  editSurvey(survey: Survey): void {
    this.editingSurveyId = survey.id!;
    this.questions.clear();
    survey.questions.forEach(question => {
      const questionGroup = this.createQuestion();
      questionGroup.patchValue({
        title: question.title,
        type: question.type,
        required: question.required
      });
      const options = questionGroup.get('options') as FormArray;
      question.options.forEach(option => {
        options.push(this.fb.control(option));
      });
      this.questions.push(questionGroup);
    });
    this.surveyForm.patchValue({
      title: survey.title,
      description: survey.description
    });
  }

  deleteSurvey(id: number): void {
    if (!confirm('Delete this survey?')) {
      return;
    }
    this.surveyService.delete(id).subscribe({
      next: () => {
        this.surveyStore.loadSurveys();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
