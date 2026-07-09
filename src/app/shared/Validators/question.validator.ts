import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuestionType } from '../../core/Models/question.model';

export function questionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const title = control.get('title')?.value;
    const type = control.get('type')?.value;
    const options = control.get('options');

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return { questionTitleRequired: true };
    }

    if (type === QuestionType.TEXT) {
      return null;
    }

    const optionValues = Array.isArray(options?.value) ? options.value : [];
    const hasEmptyOptions = optionValues.some((option: string) => !option || option.trim().length === 0);

    return optionValues.length >= 2 && !hasEmptyOptions ? null : { minimumOptions: true };
  };
}
