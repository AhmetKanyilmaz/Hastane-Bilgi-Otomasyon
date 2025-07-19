import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, LoginRequest, AuthResponse } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Mock users for demo
  private mockUsers: User[] = [
    {
      id: '1',
      name: 'Dr. Ahmet Yılmaz',
      role: 'doktor',
      email: 'dr.ahmet@hastane.com',
      department: 'Dahiliye',
      specialization: 'İç Hastalıkları',
      avatar: 'assets/avatars/doctor1.jpg'
    },
    {
      id: '2',
      name: 'Ayşe Kaya',
      role: 'laborant',
      email: 'ayse.kaya@hastane.com',
      department: 'Laboratuvar',
      avatar: 'assets/avatars/lab1.jpg'
    },
    {
      id: '3',
      name: 'Mehmet Demir',
      role: 'mali_personel',
      email: 'mehmet.demir@hastane.com',
      department: 'Mali İşler',
      avatar: 'assets/avatars/acc1.jpg'
    },
    {
      id: '4',
      name: 'Admin User',
      role: 'admin',
      email: 'admin@hastane.com',
      department: 'Bilgi İşlem',
      avatar: 'assets/avatars/admin1.jpg'
    }
  ];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Mock authentication
    const user = this.mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === '123456') {
      const response: AuthResponse = {
        user,
        token: 'mock-jwt-token',
        expiresIn: 3600
      };
      
      this.setCurrentUser(user);
      return of(response);
    }
    
    return throwError(() => new Error('Invalid credentials'));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(roleOrRoles: string | string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (Array.isArray(roleOrRoles)) {
      return roleOrRoles.includes(user.role);
    } else {
      return user.role === roleOrRoles;
    }
  }

  private setCurrentUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          this.currentUserSubject.next(user);
        } catch (error) {
          console.error('Error parsing user from storage:', error);
          localStorage.removeItem('currentUser');
        }
      }
    }
  }
}
