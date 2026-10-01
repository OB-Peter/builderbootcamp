import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AdminUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'builderbootcamp_admin_user';
  private currentUserSubject = new BehaviorSubject<AdminUser | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  public get currentUserValue(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  private getStoredUser(): AdminUser | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): Observable<AdminUser> {
    // Standard mock admin auth - ready to be wired to backend auth endpoint
    if (!email || !password) {
      return throwError(() => new Error('Please provide email and password'));
    }

    if (password.length < 6) {
      return throwError(() => new Error('Password must be at least 6 characters'));
    }

    const mockAdminUser: AdminUser = {
      id: 'usr_admin_001',
      email: email.trim().toLowerCase(),
      name: email.split('@')[0].toUpperCase() || 'Admin User',
      role: 'superadmin',
      token: `jwt_bb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    };

    return of(mockAdminUser).pipe(
      delay(600), // simulate network delay
      tap(user => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
