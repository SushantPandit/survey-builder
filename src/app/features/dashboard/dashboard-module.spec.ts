import { TestBed } from '@angular/core/testing';
import { DashboardModule } from './dashboard-module';

describe('DashboardModule', () => {
  it('should load without errors', () => {
    TestBed.configureTestingModule({ imports: [DashboardModule] });
    expect(TestBed.inject(DashboardModule)).toBeTruthy();
  });
});
