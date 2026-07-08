import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { QuestionType } from '../../../../core/Models/question.model';
import { minimumOptionsValidator } from '../../../../shared/Validators/minimum-options.validator';
import { SurveyService } from '../../../../core/Services/survey.service';
import { Survey } from '../../../../core/Models/survey.model';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrl: './survey-builder.component.scss',
  standalone: false,
})
export class SurveyBuilderComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private surveyService = inject(SurveyService);

  surveys: Survey[] = [];

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
    this.loadSurveys();
  }

  //nested form group for questions and options
  // creating method to create question form group
  private createQuestion(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      type: [QuestionType.TEXT],
      required: [false],
      options: this.fb.array<string[]>([]),
    },
      {
        validators: [
          minimumOptionsValidator()
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

    this.surveyService.create(this.surveyForm.getRawValue() as Survey).subscribe({
      next: (survey) => {
        alert('Survey Saved Successfully');
        this.loadSurveys();
        this.surveyForm.reset();
        this.questions.clear();
      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  loadSurveys(): void {
    this.surveyService.getAll().subscribe({
      next: (response) => {
        this.surveys = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
