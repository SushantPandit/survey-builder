import { inject, Injectable, signal } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TosterService {
  private snackBar = inject(MatSnackBar);
  horizontalPosition = signal<MatSnackBarHorizontalPosition>('center');
  verticalPosition = signal<MatSnackBarVerticalPosition>('top');

  openSnackBar(message: string,action?: string) {
    action = action || 'Close';
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
    });

    setTimeout(() => {
      this.snackBar.dismiss();
    }, 5000);

  }
}
