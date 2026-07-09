import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { authInterceptor } from './auth-interceptor';
import { AuthService } from '../Services/auth.service';
import { LoggerService } from '../Services/logger.service';
import { Router } from '@angular/router';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  let authService: { getToken: ReturnType<typeof vi.fn>; logout: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };
  let loggerService: { warn: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authService = {
      getToken: vi.fn(),
      logout: vi.fn(),
    };
    router = {
      navigate: vi.fn(),
    };
    loggerService = {
      warn: vi.fn(),
      error: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: LoggerService, useValue: loggerService },
      ],
    });
  });

  it('adds the bearer token when one exists', () => {
    authService.getToken.mockReturnValue('mock-token');

    const next = vi.fn().mockReturnValue(of({ ok: true }));
    const request = new HttpRequest('GET', '/api/surveys');

    interceptor(request, next).subscribe();

    const interceptedRequest = next.mock.calls[0][0] as HttpRequest<unknown>;
    expect(interceptedRequest.headers.get('Authorization')).toBe('Bearer mock-token');
  });

  it('logs the user out and redirects on unauthorized errors', () => {
    authService.getToken.mockReturnValue('mock-token');
    const error = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    const next = vi.fn().mockReturnValue(throwError(() => error));
    const request = new HttpRequest('GET', '/api/surveys');

    interceptor(request, next).subscribe({
      error: () => undefined,
    });

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(loggerService.error).toHaveBeenCalled();
  });
});
