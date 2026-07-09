import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing-module';

describe('AuthRoutingModule', () => {
  it('should import RouterModule', () => {
    TestBed.configureTestingModule({ imports: [AuthRoutingModule] });
    expect(TestBed.inject(RouterModule)).toBeTruthy();
  });
});
