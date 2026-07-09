import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { App } from './app';

@Component({
  template: ''
})
class DummyLoginComponent {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        DummyLoginComponent,
        RouterTestingModule.withRoutes([
          { path: 'login', component: DummyLoginComponent },
        ]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should expose the title signal', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    expect(app.title()).toBe('survey-builder');
  });
});
