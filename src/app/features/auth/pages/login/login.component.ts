import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/Services/auth.service';
import { Router } from '@angular/router';
import { TosterService } from '../../../../core/Services/toster.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(TosterService);

  constructor() {}

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.snackBar.openSnackBar('Email or password is null', 'Close');
      return;
    }

    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.snackBar.openSnackBar('Email or password is null', 'Close');
      throw new Error('Email or password is null');
    } else {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['/survey']);
        },
        error: (err) => {
          this.snackBar.openSnackBar(err.message, 'Close');
        },
      });
    }
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const loginRequest = this.loginForm.value;
  //     this.authService.login(loginRequest).subscribe({
  //       next: (response) => {
  //         console.log('Login successful:', response);
  //       },
  //       error: (error) => {
  //         console.error('Login failed:', error);
  //       },
  //     });
  //   }
  // }
}
