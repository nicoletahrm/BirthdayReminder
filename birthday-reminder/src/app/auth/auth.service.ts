import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://16.16.127.251:8000/api'

  constructor(private http: HttpClient) { }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<{accessToken: string, refreshToken: string}>(`${this.baseUrl}/users/login/`, {email, password})
      .pipe(tap(res => {
        this.storeAccessToken(res.accessToken, rememberMe);
        this.storeRefreshToken(res.refreshToken, rememberMe);
      }));
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<{accessToken: string}>(`${this.baseUrl}/users/efresh`, {refreshToken})
      .pipe(tap(res => {
        localStorage.setItem('access_token', res.accessToken);
      }));
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
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  }
  
  getRefreshToken() {
    return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}
