import { FormBuilder } from '@angular/forms';
import { duplicateOptionsValidator } from './duplicate-options.validator';

describe('duplicateOptionsValidator', () => {
  const fb = new FormBuilder();

  it('should return null when options control is absent', () => {
    const control = fb.group({});
    expect(duplicateOptionsValidator()(control)).toBeNull();
  });

  it('should return null when options array is empty', () => {
    const control = fb.group({ options: fb.array([]) });
    expect(duplicateOptionsValidator()(control)).toBeNull();
  });

  it('should return null when there are no duplicates', () => {
    const control = fb.group({ options: fb.array(['A', 'B', 'C']) });
    expect(duplicateOptionsValidator()(control)).toBeNull();
  });

  it('should return error when duplicates exist', () => {
    const control = fb.group({ options: fb.array(['A', 'B', 'A']) });
    expect(duplicateOptionsValidator()(control)).toEqual({ duplicateOptions: true });
  });
});
