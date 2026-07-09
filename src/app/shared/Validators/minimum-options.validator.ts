import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimumOptionsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const type = control.get('type')?.value;
    const options = control.get('options') as FormArray | null;

    if (type === 'TEXT' || !options) {
      return null;
    }

    return options.length >= 2 ? null : { minimumOptions: true };
  };
}