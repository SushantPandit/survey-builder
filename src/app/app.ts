import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('survey-builder');
  constructor() {
    this.router.navigate(['/login']);
  }
}
