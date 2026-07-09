import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appConfig } from './app.config';

describe('appConfig', () => {
  it('should export providers', () => {
    expect(appConfig.providers).toBeDefined();
    expect(appConfig.providers.length).toBeGreaterThanOrEqual(3);
  });

  it('should configure the router and http client when applied', () => {
    TestBed.configureTestingModule({
      providers: [...(appConfig.providers ?? [])],
    });

    expect(TestBed.inject(Router)).toBeTruthy();
    expect(TestBed.inject(HttpClient)).toBeTruthy();
  });
});
