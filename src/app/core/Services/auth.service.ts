import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../Models/login-request.model';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LoginResponse } from '../Models/login-response.model';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  currentUser = signal<User | null>(this.storage.getItem<User>('user'));

  login(request: LoginRequest): Observable<LoginResponse> {
    if (!request) {
      throw new Error('Login request is null');
    }
    return this.http.get<User[]>(`${environment.apiUrl}/users?email=${request.email}`).pipe(
      map((users) => {
        const user = users[0];

        if (!user || (user as any).password !== request.password) {
          throw new Error('Invalid email or password');
        }

        const response: LoginResponse = {
          token: this.generateToken(),
          user,
        };

        this.storage.setItem('token', response.token);
        this.storage.setItem('user', user);

        this.currentUser.set(user);

        return response;
      }),
    );
  }

  logout(): void {
    this.storage.clear();

    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.storage.getItem('token');
  }

  getToken(): string | null {
    return this.storage.getItem<string>('token');
  }

  private generateToken(): string {
    return btoa(Date.now() + Math.random().toString());
  }
}
