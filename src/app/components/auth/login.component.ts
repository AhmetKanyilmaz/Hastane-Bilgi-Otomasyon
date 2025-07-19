import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card-container">
        <mat-card class="login-card">
          <mat-card-header>
            <div class="hospital-logo">
              <mat-icon class="hospital-icon">local_hospital</mat-icon>
            </div>
            <mat-card-title class="login-title">Hastane Bilgi Yönetim Sistemi</mat-card-title>
            <mat-card-subtitle>Email ve şifrenizle giriş yapın</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="login-content">
            <form (ngSubmit)="onLogin()" #loginForm="ngForm">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input 
                  matInput 
                  type="email" 
                  [(ngModel)]="credentials.email" 
                  name="email"
                  placeholder="kullanici@hastane.com"
                  required>
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Şifre</mat-label>
                <input 
                  matInput 
                  [type]="hidePassword ? 'password' : 'text'" 
                  [(ngModel)]="credentials.password" 
                  name="password"
                  required>
                <mat-icon 
                  matSuffix 
                  (click)="togglePasswordVisibility()"
                  style="cursor: pointer;">
                  {{hidePassword ? 'visibility_off' : 'visibility'}}
                </mat-icon>
              </mat-form-field>

              <div class="demo-accounts">
                <h4>Demo Hesaplar:</h4>
                <div class="demo-account" (click)="setDemoCredentials('dr.ahmet@hastane.com', '123456')">
                  <mat-icon>medical_services</mat-icon>
                  <span><strong>Doktor:</strong> dr.ahmet@hastane.com</span>
                </div>
                <div class="demo-account" (click)="setDemoCredentials('ayse.kaya@hastane.com', '123456')">
                  <mat-icon>science</mat-icon>
                  <span><strong>Laborant:</strong> ayse.kaya@hastane.com</span>
                </div>
                <div class="demo-account" (click)="setDemoCredentials('mehmet.demir@hastane.com', '123456')">
                  <mat-icon>account_balance</mat-icon>
                  <span><strong>Mali Personel:</strong> mehmet.demir@hastane.com</span>
                </div>
                <div class="demo-account" (click)="setDemoCredentials('admin@hastane.com', '123456')">
                  <mat-icon>admin_panel_settings</mat-icon>
                  <span><strong>Admin:</strong> admin@hastane.com</span>
                </div>
              </div>

              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                class="login-button full-width">
                <mat-icon>login</mat-icon>
                Sisteme Giriş Yap
              </button>
            </form>
          </mat-card-content>

          <mat-card-footer class="login-footer">
            <p class="demo-note">
              <mat-icon>info</mat-icon>
              Bu bir demo sistemidir. Tüm şifreler: 123456
            </p>
          </mat-card-footer>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card-container {
      width: 100%;
      max-width: 400px;
    }

    .login-card {
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      border-radius: 16px;
    }

    .hospital-logo {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .hospital-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #1976d2;
    }

    .login-title {
      text-align: center;
      color: #333;
      font-size: 24px;
      margin-bottom: 8px;
    }

    mat-card-subtitle {
      text-align: center;
      color: #666;
    }

    .login-content {
      padding: 30px 0;
    }

    .full-width {
      width: 100%;
    }

    .demo-accounts {
      margin: 20px 0;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .demo-accounts h4 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 14px;
    }

    .demo-account {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      margin: 4px 0;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
      font-size: 13px;
    }

    .demo-account:hover {
      background-color: #e3f2fd;
    }

    .demo-account mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #1976d2;
    }

    .login-button {
      height: 48px;
      font-size: 16px;
      margin-top: 20px;
    }

    .login-footer {
      text-align: center;
      padding: 16px;
    }

    .demo-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #666;
      font-size: 12px;
      margin: 0;
    }

    .demo-note mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    mat-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    mat-option mat-icon {
      margin-right: 8px;
    }
  `]
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  setDemoCredentials(email: string, password: string): void {
    this.credentials.email = email;
    this.credentials.password = password;
  }

  onLogin(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.snackBar.open('Lütfen email ve şifre girin', 'Tamam', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.snackBar.open(`Hoş geldiniz, ${response.user.name}!`, 'Tamam', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        
        // Redirect based on role
        switch (response.user.role) {
          case 'doktor':
            this.router.navigate(['/poliklinik']);
            break;
          case 'laborant':
            this.router.navigate(['/laboratuvar']);
            break;
          case 'mali_personel':
            this.router.navigate(['/faturalama']);
            break;
          case 'admin':
            this.router.navigate(['/dashboard']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.snackBar.open('Giriş başarısız. Email ve şifrenizi kontrol edin.', 'Tamam', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
