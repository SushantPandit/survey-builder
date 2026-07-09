import { TestBed } from '@angular/core/testing';
import { AuthModule } from './auth-module';

describe('AuthModule', () => {
  it('should be created without errors', () => {
    TestBed.configureTestingModule({ imports: [AuthModule] });
    expect(TestBed.inject(AuthModule)).toBeTruthy();
  });
});
