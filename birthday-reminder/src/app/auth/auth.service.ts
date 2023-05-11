import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://16.16.127.251:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, rememberMe: boolean) {
    return this.http
      .post<{ access: string; refresh: string }>(
        `${this.baseUrl}/users/login/`,
        {
          email,
          password,
        }
      )
      .pipe(
        tap((res) => {
          console.log(res.access);
          this.storeAccessToken(res.access, rememberMe);
          this.storeRefreshToken(res.refresh, rememberMe);
        })
      );
  }

  register(
    email: string,
    first_name: string,
    last_name: string,
    password1: string,
    password2: string
  ) {
    return this.http
      .post<{ access: string; refresh: string }>(
        `${this.baseUrl}/users/register/`,
        {
          email,
          first_name,
          last_name,
          password1,
          password2,
        }
      )
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http
      .post<{ access: string }>(`${this.baseUrl}/users/login/refresh/`, {
        refreshToken,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access);
        })
      );
  }

  handleError401(err: any) {
    if (err.status === 401) {
      this.refreshToken().subscribe();
    }
  }

  private storeAccessToken(jwt: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('access_token', jwt);
    } else {
      sessionStorage.setItem('access_token', jwt);
    }
  }

  private storeRefreshToken(jwt: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('refresh_token', jwt);
    } else {
      sessionStorage.setItem('refresh_token', jwt);
    }
  }

  getAccessToken() {
    return (
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token')
    );
  }

  getRefreshToken() {
    return (
      localStorage.getItem('refresh_token') ||
      sessionStorage.getItem('refresh_token')
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}
