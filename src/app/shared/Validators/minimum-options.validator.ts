import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minimumOptionsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const type = control.get('type')?.value;
        const options = control.get('options') as FormArray;
        if (type === 'TEXT') {
            return null;
        }
        console.log('Options length:', options?.length);

        return options.length >= 2
            ? null
            : { minimumOptions: true };

    };
}