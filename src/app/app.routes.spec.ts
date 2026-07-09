import { routes } from './app.routes';
import { authGuard } from './core/Guards/auth-guard';
import { roleGuard } from './core/Guards/role-guard';

describe('app routes', () => {
  it('should define login, dashboard, and survey routes', () => {
    expect(routes).toBeDefined();
    const paths = routes.map((route) => route.path);
    expect(paths).toEqual(expect.arrayContaining(['login', 'dashboard', 'survey', '']));
  });

  it('should protect dashboard with auth and role guards', () => {
    const dashboardRoute = routes.find((route) => route.path === 'dashboard');
    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute!.canActivate).toContain(authGuard);
    expect(dashboardRoute!.canActivate).toContain(roleGuard);
  });

  it('should use lazy-loaded components and modules', () => {
    const loginRoute = routes.find((route) => route.path === 'login');
    const surveyRoute = routes.find((route) => route.path === 'survey');
    expect(loginRoute?.loadComponent).toBeInstanceOf(Function);
    expect(surveyRoute?.loadChildren).toBeInstanceOf(Function);
  });
});
