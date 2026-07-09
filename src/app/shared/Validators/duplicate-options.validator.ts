import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function duplicateOptionsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const options = control.get('options')?.value as string[] | undefined;
    if (!Array.isArray(options) || options.length === 0) {
      return null;
    }

    const duplicates = options.filter((value, index, array) => array.indexOf(value) !== index);
    return duplicates.length > 0 ? { duplicateOptions: true } : null;
  };
}
