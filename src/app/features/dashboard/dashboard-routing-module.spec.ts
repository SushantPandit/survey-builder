import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing-module';

describe('DashboardRoutingModule', () => {
  it('should provide RouterModule for dashboard routes', () => {
    TestBed.configureTestingModule({ imports: [DashboardRoutingModule] });
    expect(TestBed.inject(RouterModule)).toBeTruthy();
  });
});
