import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AdminUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'admin_token';
  private apiUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<AdminUser | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public get currentUserValue(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/admin/login`, {
      email,
      password
    }).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem(this.TOKEN_KEY, res.token);
          this.setCurrentUserFromToken(res.token, email);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setCurrentUserFromToken(token: string, fallbackEmail: string): void {
    const payload = this.parseJwt(token);
    const email = payload?.email || fallbackEmail;
    const user: AdminUser = {
      id: 'admin',
      email: email,
      name: email.split('@')[0] || 'Admin',
      role: (payload?.role as any) || 'admin',
      token: token
    };
    this.currentUserSubject.next(user);
  }

  private getStoredUser(): AdminUser | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = this.parseJwt(token);
    const email = payload?.email || 'admin@builderbootcamp.com';
    return {
      id: 'admin',
      email: email,
      name: email.split('@')[0] || 'Admin',
      role: (payload?.role as any) || 'admin',
      token: token
    };
  }

  private parseJwt(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }
}
