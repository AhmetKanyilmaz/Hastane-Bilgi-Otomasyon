import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-icon-button (click)="menuToggle.emit()" class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>
      
      <div class="hospital-info">
        <mat-icon class="hospital-icon">local_hospital</mat-icon>
        <span class="hospital-name">HBYS</span>
      </div>
      
      <div class="navbar-spacer"></div>
      
      <div class="navbar-actions">
        <button mat-icon-button matBadge="3" matBadgeColor="warn">
          <mat-icon>notifications</mat-icon>
        </button>
        
        <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-menu-button">
          <mat-icon>account_circle</mat-icon>
        </button>
        
        <mat-menu #userMenu="matMenu">
          <div class="user-info">
            <div class="user-name">{{ currentUser?.name }}</div>
            <div class="user-role">{{ getRoleDisplayName(currentUser?.role) }}</div>
            <div class="user-department">{{ currentUser?.department }}</div>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>Profil</span>
          </button>
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Ayarlar</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>Çıkış Yap</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      height: 64px;
      padding: 0 16px;
    }

    .menu-button {
      margin-right: 8px;
    }

    .hospital-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .hospital-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .hospital-name {
      font-size: 20px;
      font-weight: 600;
    }

    .navbar-spacer {
      flex: 1;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-menu-button {
      margin-left: 8px;
    }

    .user-info {
      padding: 16px;
      text-align: center;
      min-width: 200px;
    }

    .user-name {
      font-weight: 500;
      font-size: 16px;
      color: #333;
      margin-bottom: 4px;
    }

    .user-role {
      color: #1976d2;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .user-department {
      color: #666;
      font-size: 12px;
    }

    mat-divider {
      margin: 8px 0;
    }
  `]
})
export class NavbarComponent {
  @Input() currentUser: User | null = null;
  @Output() menuToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  getRoleDisplayName(role: string | undefined): string {
    const roleMap: { [key: string]: string } = {
      'doktor': 'Doktor',
      'laborant': 'Laborant',
      'muhasebe': 'Muhasebe Uzmanı',
      'admin': 'Sistem Yöneticisi'
    };
    return role ? roleMap[role] || role : '';
  }
}
