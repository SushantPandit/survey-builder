# Survey Builder Analytics Dashboard

This Angular 21 application provides a small survey management experience with authentication, role-based access, reactive forms, CRUD workflows, and D3-based analytics charts.

## Features

- Authentication flow with JWT-style token handling
- Route and role guards for protected pages
- Survey builder with reactive forms, form arrays, and validation
- CRUD operations for surveys backed by a lightweight JSON server
- Dashboard charts for survey response volume and question-type distribution

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the mock API server:
   ```bash
   npx json-server --watch db.json --port 3000
   ```
3. Start the Angular app:
   ```bash
   npm start
   ```
4. Open the app at http://localhost:4200

## Project structure

- src/app/core: shared services, guards, models, and interceptors
- src/app/features/auth: login experience
- src/app/features/survey-builder: survey creation and management
- src/app/features/dashboard: analytics dashboard and D3 charts
- src/app/shared/Validators: reusable form validators

## Verification

Run the build and unit tests with:

```bash
npm run build
npm test -- --watch=false
```

## Notes

The current implementation uses the provided JSON mock data and keeps the analytics views lightweight so they can be expanded with more advanced aggregation later.
