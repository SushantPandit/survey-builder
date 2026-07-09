import { FormBuilder } from '@angular/forms';
import { minimumOptionsValidator } from './minimum-options.validator';

describe('minimumOptionsValidator', () => {
  const fb = new FormBuilder();

  it('should return null for TEXT questions', () => {
    const control = fb.group({ type: ['TEXT'], options: fb.array([]) });
    expect(minimumOptionsValidator()(control)).toBeNull();
  });

  it('should return null when options control is absent for non-text questions', () => {
    const control = fb.group({ type: ['MULTIPLE'] });
    expect(minimumOptionsValidator()(control)).toBeNull();
  });

  it('should return null when options length is >= 2', () => {
    const control = fb.group({ type: ['MULTIPLE'], options: fb.array(['a', 'b']) });
    expect(minimumOptionsValidator()(control)).toBeNull();
  });

  it('should return validation error when options length is < 2', () => {
    const control = fb.group({ type: ['CHECKBOX'], options: fb.array(['a']) });
    expect(minimumOptionsValidator()(control)).toEqual({ minimumOptions: true });
  });
});
