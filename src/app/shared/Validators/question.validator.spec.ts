import { FormBuilder } from '@angular/forms';
import { describe, expect, it, beforeEach } from 'vitest';
import { QuestionType } from '../../core/Models/question.model';
import { questionValidator } from './question.validator';

describe('questionValidator', () => {
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
  });

  it('accepts text questions without options', () => {
    const group = fb.group({
      title: ['How are you?'],
      type: [QuestionType.TEXT],
      options: fb.array([]),
    }, { validators: questionValidator() });

    expect(group.errors).toBeNull();
  });

  it('requires at least two options for multiple choice questions', () => {
    const group = fb.group({
      title: ['Favorite color'],
      type: [QuestionType.MULTIPLE],
      options: fb.array(['Red']),
    }, { validators: questionValidator() });

    expect(group.errors).toEqual({ minimumOptions: true });
  });

  it('rejects empty or whitespace-only titles', () => {
    const group = fb.group({
      title: ['   '],
      type: [QuestionType.MULTIPLE],
      options: fb.array(['A', 'B']),
    }, { validators: questionValidator() });

    expect(group.errors).toEqual({ questionTitleRequired: true });
  });

  it('rejects checkbox questions with an empty option string', () => {
    const group = fb.group({
      title: ['Select multiple'],
      type: [QuestionType.CHECKBOX],
      options: fb.array(['Yes', '']),
    }, { validators: questionValidator() });

    expect(group.errors).toEqual({ minimumOptions: true });
  });

  it('accepts valid checkbox questions with two non-empty options', () => {
    const group = fb.group({
      title: ['Select multiple'],
      type: [QuestionType.CHECKBOX],
      options: fb.array(['Yes', 'No']),
    }, { validators: questionValidator() });

    expect(group.errors).toBeNull();
  });
});
